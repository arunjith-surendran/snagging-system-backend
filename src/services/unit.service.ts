import unitRepository from '../repositories/unit.repository';
import { IUnit } from '../models/units/units.model';
import { validateRequiredField, validateNotFound, validateUserAuthorization } from '../utils/validators';

/**
 * ✅ Get all units by building ID
 * @param {string} projectId - Building UUID
 * @returns {Promise<IUnit[]>}
 * @description Service layer function to retrieve all units linked to a specific building.
 */

const getAllUnits = async (
  userId: string
): Promise<{ units: IUnit[]; totalCount: number;}> => {
  validateUserAuthorization(userId);
  const { units, totalCount } = await unitRepository.getAllUnits();
  return { units, totalCount };
};


const getUnitsByProjectId = async (projectId: string): Promise<IUnit[]> => {
  validateRequiredField(projectId, 'project ID');

  const units = await unitRepository.getUnitsByProjectId(projectId);
  validateNotFound(units.length ? true : null, 'Units for this building');

  const transformedUnits: IUnit[] = units.map((unit) => ({
    ...unit,
    areaSqft: unit.areaSqft ? Number(unit.areaSqft) : null,
  }));
  return transformedUnits;
};

export default {
  getAllUnits,
  getUnitsByProjectId,
};
