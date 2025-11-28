import fs from 'fs-extra';
import path from 'path';
import ExcelJS from 'exceljs';
import { Response } from 'express';

import issueStatusRepository from '../repositories/issueStatus.repository';
import { validateRequiredField, validateBadRequest, validateUserAuthorization } from '../utils/validators';
import { safeDeleteFile } from '../middlewares/upload/file-utils';

import IssueStatusEntity from '../entities/issue.status.entity';
import { NewIssueStatus } from '../models/issueStatuses/issueStatus.schema';

/**
 * ✅ Import Issue Statuses from File (Excel or CSV)
 * @function importIssueStatuses
 * @description Reads uploaded file and inserts issue status records into DB.
 */
const importIssueStatuses = async (filePath: string, userId: string): Promise<{ insertedCount: number }> => {
  try {
    validateBadRequest(!fs.existsSync(filePath), `Uploaded file not found: ${filePath}`);
    console.log('📄 Reading uploaded file:', filePath);

    const workbook = new ExcelJS.Workbook();
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.csv') {
      await workbook.csv.readFile(filePath);
    } else {
      await workbook.xlsx.readFile(filePath);
    }

    const worksheet = workbook.worksheets[0];
    validateBadRequest(!worksheet, 'Invalid or empty file uploaded');

    const entities: IssueStatusEntity[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // skip header

      const statusName = String(row.getCell(1).value || '').trim();
      const fullName = String(row.getCell(2).value || '').trim();
      const allowHigherRoles = row.getCell(3).value === true || row.getCell(3).value === 'true';
      const isActive = row.getCell(4).value === true || row.getCell(4).value === 'true';

      if (!statusName) return;

      entities.push(
        new IssueStatusEntity(
          true, // documentStatus
          statusName, // statusName
          fullName, // fullName
          allowHigherRoles, // allowHigherRoles
          isActive, // isActive
          userId, // createdUser
          new Date(), // createdAt
          userId, // updatedUser
          new Date(), // updatedAt
        ),
      );
    });

    validateBadRequest(!entities.length, 'No valid issue status records found.');

    const now = new Date();

    const payload: NewIssueStatus[] = entities.map((e) => ({
      documentStatus: e.documentStatus,
      statusName: e.statusName,
      fullName: e.fullName,
      allowHigherRoles: e.allowHigherRoles,
      isActive: e.isActive,
      createdUser: e.createdUser,
      createdAt: e.createdAt,
      updatedUser: e.updatedUser,
      updatedAt: e.updatedAt,
    }));

    const insertedCount = await issueStatusRepository.bulkInsert(payload);

    safeDeleteFile(filePath);

    console.log(`✅ Imported ${insertedCount} Issue Status(es) successfully`);
    return { insertedCount };
  } catch (err: any) {
    safeDeleteFile(filePath);
    console.error('❌ Import failed:', err.message);
    throw err;
  }
};

/**
 * ✅ Get All Issue Statuses (Paginated)
 * @function getAllIssueStatuses
 * @description Fetches paginated issue status records from DB.
 */
const getAllIssueStatuses = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
): Promise<{ statuses: any[]; totalCount: number; hasNext: boolean }> => {
  validateRequiredField(pageNumber, 'pageNumber');
  validateRequiredField(pageSize, 'pageSize');
  validateBadRequest(pageNumber <= 0, 'pageNumber must be > 0');
  validateBadRequest(pageSize <= 0, 'pageSize must be > 0');

  const { statuses, totalCount, hasNext } = await issueStatusRepository.getAllStatuses(pageNumber, pageSize);

  return { statuses, totalCount, hasNext };
};

/**
 * ✅ Download Issue Statuses (Excel / CSV)
 * @function downloadIssueStatuses
 * @description Creates Excel/CSV export and streams to client.
 */
const downloadIssueStatuses = async (format: 'excel' | 'csv', res: Response, userId?: string): Promise<{ fileName: string }> => {
  validateUserAuthorization(userId);

  const allStatuses = await issueStatusRepository.getAllForExport();
  validateBadRequest(!allStatuses.length, 'No issue statuses found to export.');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Issue Statuses');

  sheet.addRow([
    'id',
    'documentStatus',
    'statusName',
    'fullName',
    'allowHigherRoles',
    'isActive',
    'createdUser',
    'createdAt',
    'updatedUser',
    'updatedAt',
  ]);

  allStatuses.forEach((s: any) => {
    sheet.addRow([
      s.id,
      s.documentStatus,
      s.statusName,
      s.fullName,
      s.allowHigherRoles,
      s.isActive,
      s.createdUser,
      s.createdAt,
      s.updatedUser,
      s.updatedAt,
    ]);
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `issue_statuses_${timestamp}.${format === 'csv' ? 'csv' : 'xlsx'}`;

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
 * ✅ Add Issue Status (Admin)
 * @function addIssueStatus
 * @description Validates and inserts a new issue status.
 */
const addIssueStatus = async (userId: string, statusData: NewIssueStatus): Promise<NewIssueStatus> => {
  validateUserAuthorization(userId);
  validateRequiredField(statusData.statusName, 'statusName');
  validateRequiredField(statusData.fullName, 'fullName');

  const entity = new IssueStatusEntity(
    true,
    statusData.statusName.trim(),
    statusData.fullName.trim(),
    statusData.allowHigherRoles ?? false,
    statusData.isActive ?? true,
    userId,
    new Date(),
    userId,
    new Date(),
  );

  return await issueStatusRepository.createStatus(entity);
};

/**
 * ✅ Update Issue Status by ID (Admin)
 * @function updateIssueStatus
 * @description Updates an issue status record.
 */
const updateIssueStatus = async (userId: string | undefined, id: string, updatedData: Partial<NewIssueStatus>): Promise<any> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'statusId');

  const existing = await issueStatusRepository.findById(id);
  validateBadRequest(!existing, 'Issue Status not found');

  const updated = await issueStatusRepository.updateStatus(id, {
    ...updatedData,
    updatedUser: userId,
    updatedAt: new Date(),
  });

  return updated;
};

/**
 * ✅ Delete Issue Status (Admin)
 * @function deleteIssueStatus
 * @description Deletes a specific issue status.
 */
const deleteIssueStatus = async (userId: string | undefined, id: string): Promise<void> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'statusId');

  const existing = await issueStatusRepository.findById(id);
  validateBadRequest(!existing, 'Issue Status not found');

  await issueStatusRepository.deleteStatus(id);
};

/**
 * ✅ Get Issue Status by ID (Admin)
 * @function getIssueStatusById
 * @description Fetches details of a single issue status.
 */
const getIssueStatusById = async (userId: string | undefined, id: string): Promise<any> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'statusId');

  const status = await issueStatusRepository.findById(id);
  validateBadRequest(!status, 'Issue Status not found');

  return status;
};

export default {
  importIssueStatuses,
  getAllIssueStatuses,
  downloadIssueStatuses,
  addIssueStatus,
  updateIssueStatus,
  deleteIssueStatus,
  getIssueStatusById,
};
