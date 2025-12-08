import fs from 'fs-extra';
import path from 'path';
import ExcelJS from 'exceljs';
import { Response } from 'express';

import issueTypeRepository from '../repositories/issueType.repository';
import { validateBadRequest, validateRequiredField, validateUserAuthorization } from '../utils/validators';
import { safeDeleteFile } from '../middlewares/upload/file-utils';

import IssueTypeEntity from '../entities/issueType.entity';

/**
 * ✅ Import Issue Types from File (Excel or CSV)
 * @function importIssueTypes
 * @description Reads uploaded file and inserts issue type records into DB.
 */
const importIssueTypes = async (filePath: string, userId: string): Promise<{ insertedCount: number }> => {
  try {
    validateBadRequest(!fs.existsSync(filePath), `Uploaded file not found: ${filePath}`);

    const workbook = new ExcelJS.Workbook();
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.csv') {
      await workbook.csv.readFile(filePath);
    } else {
      await workbook.xlsx.readFile(filePath);
    }

    const worksheet = workbook.worksheets[0];
    validateBadRequest(!worksheet, 'Invalid or empty file uploaded');

    const entities: IssueTypeEntity[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // skip header row

      const category = String(row.getCell(1).value || '').trim();
      const type = String(row.getCell(2).value || '').trim();
      const item = String(row.getCell(3).value || '').trim();
      const current = row.getCell(4).value === true || row.getCell(4).value === 'true';

      if (!category || !type || !item) return;

      entities.push(
        new IssueTypeEntity(
          category,
          type,
          item,
          current,
          userId,
        ),
      );
    });

    validateBadRequest(!entities.length, 'No valid issue type records found.');

    const payload = entities.map((e) => ({
      category: e.category,
      type: e.type,
      item: e.item,
      current: e.current,
      createdUser: e.createdUser,
      createdAt: new Date(),
      updatedUser: e.createdUser,
      updatedAt: new Date(),
    }));

    const insertedCount = await issueTypeRepository.bulkInsert(payload);

    safeDeleteFile(filePath);

    return { insertedCount };
  } catch (err: any) {
    safeDeleteFile(filePath);
    throw err;
  }
};

/**
 * ✅ Get All Issue Types
 * @function getAllIssueTypes
 * @description Fetches all issue types (no pagination required).
 */
const getAllIssueTypes = async (userId: string) => {
  validateUserAuthorization(userId);

  const types = await issueTypeRepository.getAllTypes();

  return {
    issueTypes: types,
    totalCount: types.length,
  };
};

/**
 * ✅ Download Issue Types (Excel / CSV)
 * @function downloadIssueTypes
 * @description Streams Excel/CSV export to client.
 */
const downloadIssueTypes = async (
  format: 'excel' | 'csv',
  res: Response,
  userId?: string,
): Promise<{ fileName: string }> => {
  validateUserAuthorization(userId);

  const allTypes = await issueTypeRepository.getAllForExport();
  validateBadRequest(!allTypes.length, 'No issue types found to export.');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Issue Types');

  sheet.addRow([
    'id',
    'category',
    'type',
    'item',
    'current',
    'createdUser',
    'createdAt',
    'updatedUser',
    'updatedAt',
  ]);

  allTypes.forEach((t: any) => {
    sheet.addRow([
      t.id,
      t.category,
      t.type,
      t.item,
      t.current,
      t.createdUser,
      t.createdAt,
      t.updatedUser,
      t.updatedAt,
    ]);
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `issue_types_${timestamp}.${format === 'csv' ? 'csv' : 'xlsx'}`;

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.csv.write(res);
  } else {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
  }

  res.end();
  return { fileName };
};

/**
 * ✅ Add Issue Type (Admin)
 * @function addIssueType
 * @description Validates and inserts a new issue type.
 */
const addIssueType = async (userId: string, data: any) => {
  validateUserAuthorization(userId);

  validateRequiredField(data.category, 'category');
  validateRequiredField(data.type, 'type');
  validateRequiredField(data.item, 'item');

  const entity = new IssueTypeEntity(
    data.category.trim(),
    data.type.trim(),
    data.item.trim(),
    data.current ?? true,
    userId,
  );

  return await issueTypeRepository.createType({
    ...entity,
    createdAt: new Date(),
    updatedUser: userId,
    updatedAt: new Date(),
  });
};

/**
 * ✅ Update Issue Type
 */
const updateIssueType = async (userId: string | undefined, id: string, updatedData: Partial<any>) => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'typeId');

  const existing = await issueTypeRepository.findById(id);
  validateBadRequest(!existing, 'Issue Type not found');

  const updated = await issueTypeRepository.updateType(id, {
    ...updatedData,
    updatedUser: userId,
    updatedAt: new Date(),
  });

  return updated;
};

/**
 * ✅ Delete Issue Type
 */
const deleteIssueType = async (userId: string | undefined, id: string): Promise<void> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'typeId');

  const existing = await issueTypeRepository.findById(id);
  validateBadRequest(!existing, 'Issue Type not found');

  await issueTypeRepository.deleteType(id);
};

/**
 * ✅ Get Issue Type by ID
 */
const getIssueTypeById = async (userId: string | undefined, id: string) => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'typeId');

  const type = await issueTypeRepository.findById(id);
  validateBadRequest(!type, 'Issue Type not found');

  return type;
};

export default {
  importIssueTypes,
  getAllIssueTypes,
  downloadIssueTypes,
  addIssueType,
  updateIssueType,
  deleteIssueType,
  getIssueTypeById,
};
