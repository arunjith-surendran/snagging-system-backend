import fs from "fs";
import xlsx from "xlsx";
import teamRepository from "../repositories/team.repository";
import { NewTeam } from "../models/teams/teams.schema";
import { validateRequiredField, validateBadRequest } from "../utils/validators";
import { safeDeleteFile } from "../middlewares/upload/file-utils";
import TeamEntity from "../entities/team.entity";

/**
 * ✅ Import Teams from File
 * @function importTeams
 * @description Reads and parses uploaded Excel/CSV file, validates content, transforms to DB payload, and stores it.
 * @param {string} filePath - Local path of uploaded file
 * @returns {Promise<{ insertedCount: number }>} - Count of inserted records
 */
const importTeams = async (filePath: string): Promise<{ insertedCount: number }> => {
  try {
    // 🧾 Validate file existence
    validateBadRequest(!fs.existsSync(filePath), `Uploaded file not found: ${filePath}`);
    console.log("📄 Reading Excel file:", filePath);

    // 📖 Read the first sheet from the Excel/CSV
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet) as Record<string, any>[];

    // 🧩 Validate non-empty file
    validateBadRequest(!rows.length, "File is empty or invalid format.");

    // 🔄 Transform to entities
    const entities = rows
      .map((row) => {
        const teamName = String(row["Team Name"] || "").trim();
        if (!teamName) return null; // Skip invalid rows

        return new TeamEntity({
          teamName,
          teamInitials: String(row["Team Initials"] || "").trim() || null,
          teamType: String(row["Team Type"] || "").trim() || null,
          teamAddress: String(row["Address"] || "").trim() || null,
          teamTelephone: String(row["Tel"] || "").trim() || null,
          teamEmail: String(row["Email"] || "").trim() || null,
          teamRole: String(row["Role"] || "").trim() || null,
        });
      })
      .filter((t): t is TeamEntity => !!t);

    validateBadRequest(!entities.length, "No valid team records found.");

    // 🧾 Transform to DB-compatible payload
    const payload: NewTeam[] = entities.map((e) => ({
      documentStatus: e.documentStatus,
      teamName: e.teamName,
      teamInitials: e.teamInitials,
      teamType: e.teamType,
      teamAddress: e.teamAddress,
      teamTelephone: e.teamTelephone,
      teamEmail: e.teamEmail,
      teamRole: e.teamRole,
      active: e.active,
      createdUser: e.createdUser ?? "system-upload",
      updatedUser: e.updatedUser ?? "system-upload",
    }));

    // 💾 Bulk insert into DB
    const insertedCount = await teamRepository.bulkInsert(payload);

    // 🧹 Always delete uploaded file after processing
    safeDeleteFile(filePath);

    console.log(`✅ Inserted ${insertedCount} team(s)`);
    return { insertedCount };
  } catch (err) {
    safeDeleteFile(filePath); // Cleanup on error too
    throw err;
  }
};

/**
 * ✅ Get All Teams
 * @function getAllTeams
 * @description Fetches paginated list of team records
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ teams: any[]; totalCount: number; hasNext: boolean }>}
 */
const getAllTeams = async (
  pageNumber: number,
  pageSize: number
): Promise<{ teams: any[]; totalCount: number; hasNext: boolean }> => {
  // 🧩 Proper validation for pagination inputs
  validateRequiredField(pageNumber, "pageNumber");
  validateRequiredField(pageSize, "pageSize");
  validateBadRequest(pageNumber <= 0, "pageNumber must be greater than 0");
  validateBadRequest(pageSize <= 0, "pageSize must be greater than 0");

  const { teams, totalCount, hasNext } = await teamRepository.getAllTeams(pageNumber, pageSize);
  return { teams, totalCount, hasNext };
};

export default {
  importTeams,
  getAllTeams,
};
