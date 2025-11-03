import fs from 'fs-extra';
import path from 'path';
import ExcelJS from 'exceljs';
import { Response } from 'express';
import teamRepository from '../repositories/team.repository';
import { NewTeam } from '../models/teams/teams.schema';
import { validateRequiredField, validateBadRequest, validateUserAuthorization } from '../utils/validators';
import { safeDeleteFile } from '../middlewares/upload/file-utils';
import TeamEntity from '../entities/team.entity';
import { UserRole } from '../types/user';
import ERROR from '../middlewares/web_server/http-error';

/**
 * ✅ Import Teams from File (Excel or CSV)
 * @function importTeams
 * @description Reads uploaded file, validates rows, and inserts new team records into DB.
 */
const importTeams = async (
  filePath: string,
  userId: string
): Promise<{ insertedCount: number }> => {
  try {
    // 🧩 Validate file existence
    validateBadRequest(!fs.existsSync(filePath), `Uploaded file not found: ${filePath}`);
    console.log("📄 Reading uploaded file:", filePath);

    const workbook = new ExcelJS.Workbook();
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".csv") {
      await workbook.csv.readFile(filePath);
    } else {
      await workbook.xlsx.readFile(filePath);
    }

    const worksheet = workbook.worksheets[0];
    validateBadRequest(!worksheet, "Invalid or empty file uploaded");

    const rows = worksheet.getSheetValues().slice(2); // skip header rows
    validateBadRequest(!rows.length, "File is empty or invalid format.");

    const validRoles = Object.values(UserRole);

    const entities: TeamEntity[] = rows
      .map((row: any, index: number) => {
        const cells = Array.isArray(row) ? row : [];
        const teamName = String(cells[2] || "").trim();
        const teamInitials = String(cells[3] || "").trim();
        const teamType = String(cells[4] || "").trim(); // ✅ now plain string
        const address = String(cells[5] || "").trim();
        const tel = String(cells[6] || "").trim();
        const email = String(cells[7] || "").trim();
        const rawRole = String(cells[8] || "").trim().toUpperCase();

        if (!teamName) return null; // skip empty row

        // ✅ Validate that role matches UserRole enum
        if (!rawRole) {
          throw new ERROR.ValidationError(
            `❌ Missing teamRole in row ${index + 2}. It must be one of: ${validRoles.join(", ")}`
          );
        }

        const normalizedRole = Object.values(UserRole).find(
          (r) => r.toUpperCase() === rawRole
        );

        if (!normalizedRole) {
          throw new ERROR.ValidationError(
            `❌ Invalid teamRole '${rawRole}' in row ${index + 2}. Must be one of: ${validRoles.join(", ")}`
          );
        }

        return new TeamEntity({
          teamName,
          teamInitials: teamInitials || null,
          teamType: teamType || null, // ✅ plain string
          teamAddress: address || null,
          teamTelephone: tel || null,
          teamEmail: email ? email.toLowerCase() : null,
          teamRole: normalizedRole as UserRole, // ✅ validated enum
          createdUser: userId,
          updatedUser: userId,
        });
      })
      .filter((t): t is TeamEntity => !!t);

    validateBadRequest(!entities.length, "No valid team records found.");

    const payload: NewTeam[] = entities.map((e) => ({
      documentStatus: e.documentStatus,
      teamName: e.teamName,
      teamInitials: e.teamInitials ?? undefined,
      teamType: e.teamType ?? undefined, // ✅ plain string
      teamAddress: e.teamAddress ?? undefined,
      teamTelephone: e.teamTelephone ?? undefined,
      teamEmail: e.teamEmail ?? undefined,
      teamRole: e.teamRole, // ✅ enum
      active: e.active,
      createdUser: userId,
      updatedUser: userId,
    }));

    const insertedCount = await teamRepository.bulkInsert(payload);
    safeDeleteFile(filePath);

    console.log(`✅ Imported ${insertedCount} team(s)`);
    return { insertedCount };
  } catch (err: any) {
    safeDeleteFile(filePath);
    console.error("❌ Import failed:", err.message);
    throw err;
  }
};


/**
 * ✅ Get All Teams (Paginated)
 * @function getAllTeams
 * @description Fetches paginated team records from DB.
 */
const getAllTeams = async (userId: string, pageNumber: number, pageSize: number): Promise<{ teams: any[]; totalCount: number; hasNext: boolean }> => {
  // validateUserAuthorization(userId);
  validateRequiredField(pageNumber, 'pageNumber');
  validateRequiredField(pageSize, 'pageSize');
  validateBadRequest(pageNumber <= 0, 'pageNumber must be greater than 0');
  validateBadRequest(pageSize <= 0, 'pageSize must be greater than 0');

  const { teams, totalCount, hasNext } = await teamRepository.getAllTeams(pageNumber, pageSize);
  return { teams, totalCount, hasNext };
};

/**
 * ✅ Download Teams (Excel / CSV)
 * @function downloadTeams
 * @description Fetches all team records, validates access, generates Excel/CSV in memory, and streams it to client.
 * @param {"excel" | "csv"} format - Desired file format
 * @param {Response} res - Express response stream
 * @param {string | undefined} userId - Authenticated user ID (optional to handle validation internally)
 * @returns {Promise<{ fileName: string }>} - Downloaded filename
 */
const downloadTeams = async (format: 'excel' | 'csv', res: Response, userId?: string): Promise<{ fileName: string }> => {
  // 🧩 Step 1: Validate user authorization
  validateUserAuthorization(userId);
  const allTeams = await teamRepository.getAllTeamsForExport();
  validateBadRequest(!allTeams.length, 'No teams found to export.');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Teams');

  sheet.addRow([
    'id',
    'documentStatus',
    'teamName',
    'teamInitials',
    'teamType',
    'teamAddress',
    'teamTelephone',
    'teamEmail',
    'teamRole',
    'active',
    'createdUser',
    'createdAt',
    'updatedUser',
    'updatedAt',
  ]);

  allTeams.forEach((team: any) => {
    sheet.addRow([
      team.id,
      team.documentStatus,
      team.teamName,
      team.teamInitials,
      team.teamType,
      team.teamAddress,
      team.teamTelephone,
      team.teamEmail,
      team.teamRole,
      team.active,
      team.createdUser,
      team.createdAt,
      team.updatedUser,
      team.updatedAt,
    ]);
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `teams_${timestamp}.${format === 'csv' ? 'csv' : 'xlsx'}`;

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.csv.write(res);
  } else {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
  }

  res.end();
  return { fileName };
};

/**
 * ✅ Add Team (Admin)
 * @function addTeam
 * @param {string} userId - Authenticated admin user ID
 * @param {NewTeam} teamData - Team details to create
 * @returns {Promise<NewTeam>} - Created team record
 * @description Allows admin to add a new team manually through API.
 */
const addTeam = async (userId: string, teamData: NewTeam): Promise<NewTeam> => {
  // 🧩 Step 1: Validate user & required fields
  validateUserAuthorization(userId);
  validateRequiredField(teamData.teamName, "teamName");

  // 🧩 Step 2: Normalize and validate teamRole (enum)
  const rawRole = String(teamData.teamRole || "").trim().toLowerCase();

  let teamRole: UserRole;
  switch (rawRole) {
    case "super_admin_admin":
      teamRole = UserRole.SUPER_ADMIN_ADMIN;
      break;
    case "inspector_team":
      teamRole = UserRole.INSPECTOR_TEAM;
      break;
    case "contractor_team":
      teamRole = UserRole.CONTRACTOR_TEAM;
      break;
    case "sub_contractor_team":
      teamRole = UserRole.SUB_CONTRACTOR_TEAM;
      break;
    case "qa_verify_team":
      teamRole = UserRole.QA_VERIFY_TEAM;
      break;
    default:
      throw new ERROR.ValidationError(
        `❌ Invalid teamRole '${rawRole}'. Must be one of: ${Object.values(UserRole).join(", ")}`
      );
  }

  // 🧩 Step 3: Build TeamEntity (teamType is plain string)
  const teamEntity = new TeamEntity({
    documentStatus: teamData.documentStatus ?? true,
    teamName: teamData.teamName.trim(),
    teamInitials: teamData.teamInitials?.trim() ?? null,
    teamType: teamData.teamType?.trim() ?? null, // ✅ plain text
    teamAddress: teamData.teamAddress?.trim() ?? null,
    teamTelephone: teamData.teamTelephone?.trim() ?? null,
    teamEmail: teamData.teamEmail?.toLowerCase() ?? null,
    teamRole, // ✅ validated enum
    active: teamData.active ?? true,
    createdUser: userId,
    updatedUser: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 🧩 Step 4: Save to DB
  const createdTeam = await teamRepository.createTeam(teamEntity);
  return createdTeam;
};

/**
 * ✅ Update Team by ID (Admin)
 * @function updateTeam
 * @param {string | undefined} userId - Authenticated user ID
 * @param {string} id - Team ID to update
 * @param {Partial<NewTeam>} updatedData - Partial team data to update
 * @returns {Promise<any>} - Updated team record
 * @description Validates request, checks existence, and updates team record in the database.
 */
const updateTeam = async (userId: string | undefined, id: string, updatedData: Partial<NewTeam>): Promise<any> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'teamId');
  const existingTeam = await teamRepository.findById(id);
  validateBadRequest(!existingTeam, 'Team not found');
  const dataToUpdate = {
    ...updatedData,
    updatedUser: userId,
    updatedAt: new Date(),
  };
  const updatedTeam = await teamRepository.updateTeam(id, dataToUpdate);
  return updatedTeam;
};

/**
 * ✅ Delete Team by ID (Admin)
 * @function deleteTeam
 * @param {string | undefined} userId - Authenticated admin user ID
 * @param {string} id - Team ID to delete
 * @returns {Promise<void>}
 * @description Validates authorization, checks if team exists, and deletes it from the database.
 */
const deleteTeam = async (userId: string | undefined, id: string): Promise<void> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'teamId');
  const existingTeam = await teamRepository.findById(id);
  validateBadRequest(!existingTeam, 'Team not found');
  await teamRepository.deleteTeam(id);
};

/**
 * ✅ Get Team by ID (Admin)
 * @function getTeamById
 * @param {string | undefined} userId - Authenticated admin user ID
 * @param {string} id - Team ID to fetch
 * @returns {Promise<any>} - Team record
 * @description Validates authorization and fetches detailed information for a specific team.
 */
const getTeamById = async (userId: string | undefined, id: string): Promise<any> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'teamId');
  const team = await teamRepository.findById(id);
  validateBadRequest(!team, 'Team not found');
  return team;
};
export default {
  importTeams,
  getAllTeams,
  downloadTeams,
  addTeam,
  updateTeam,
  deleteTeam,
  getTeamById,
};
