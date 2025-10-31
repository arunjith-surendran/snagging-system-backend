import fs from "fs-extra";
import path from "path";
import ExcelJS from "exceljs";
import { Response } from "express";
import teamRepository from "../repositories/team.repository";
import { NewTeam } from "../models/teams/teams.schema";
import { validateRequiredField, validateBadRequest } from "../utils/validators";
import { safeDeleteFile } from "../middlewares/upload/file-utils";
import TeamEntity from "../entities/team.entity";

/**
 * ✅ Import Teams from File (Excel or CSV)
 * @function importTeams
 * @description Reads uploaded file, validates rows, and inserts new team records into DB.
 */
const importTeams = async (filePath: string): Promise<{ insertedCount: number }> => {
  try {
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

    const rows = worksheet.getSheetValues().slice(2);
    validateBadRequest(!rows.length, "File is empty or invalid format.");

    const entities: TeamEntity[] = rows
      .map((row: any) => {
        if (!row || !row[2]) return null;
        return new TeamEntity({
          teamName: String(row[2] || "").trim(),
          teamInitials: String(row[3] || "").trim(),
          teamType: String(row[4] || "").trim(),
          teamAddress: String(row[5] || "").trim(),
          teamTelephone: String(row[6] || "").trim(),
          teamEmail: String(row[7] || "").trim(),
          teamRole: String(row[8] || "").trim(),
        });
      })
      .filter((t): t is TeamEntity => !!t);

    validateBadRequest(!entities.length, "No valid team records found.");

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

    const insertedCount = await teamRepository.bulkInsert(payload);
    safeDeleteFile(filePath);
    console.log(`✅ Imported ${insertedCount} team(s)`);

    return { insertedCount };
  } catch (err) {
    safeDeleteFile(filePath);
    throw err;
  }
};

/**
 * ✅ Get All Teams (Paginated)
 * @function getAllTeams
 * @description Fetches paginated team records from DB.
 */
const getAllTeams = async (
  pageNumber: number,
  pageSize: number
): Promise<{ teams: any[]; totalCount: number; hasNext: boolean }> => {
  validateRequiredField(pageNumber, "pageNumber");
  validateRequiredField(pageSize, "pageSize");
  validateBadRequest(pageNumber <= 0, "pageNumber must be greater than 0");
  validateBadRequest(pageSize <= 0, "pageSize must be greater than 0");

  const { teams, totalCount, hasNext } = await teamRepository.getAllTeams(pageNumber, pageSize);
  return { teams, totalCount, hasNext };
};

/**
 * ✅ Download Teams (Excel / CSV)
 * @function downloadTeams
 * @description Fetches all team records, generates Excel/CSV in memory, and streams it to client.
 * @param {"excel" | "csv"} format - Desired format to download
 * @param {Response} res - Express response stream
 * @returns {Promise<{ fileName: string }>} - Downloaded filename
 */
const downloadTeams = async (
  format: "excel" | "csv",
  res: Response
): Promise<{ fileName: string }> => {
  const allTeams = await teamRepository.getAllTeamsForExport();
  validateBadRequest(!allTeams.length, "No teams found to export.");

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Teams");

  sheet.addRow([
    "id",
    "documentStatus",
    "teamName",
    "teamInitials",
    "teamType",
    "teamAddress",
    "teamTelephone",
    "teamEmail",
    "teamRole",
    "active",
    "createdUser",
    "createdAt",
    "updatedUser",
    "updatedAt",
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

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `teams_${timestamp}.${format === "csv" ? "csv" : "xlsx"}`;

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    await workbook.csv.write(res);
  } else {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
  }

  res.end();
  return { fileName };
};

export default {
  importTeams,
  getAllTeams,
  downloadTeams,
};
