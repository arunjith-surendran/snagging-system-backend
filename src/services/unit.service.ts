import unitRepository from '../repositories/unit.repository';
import { IUnit } from '../models/units/units.model';
import { validateRequiredField, validateNotFound } from '../utils/validators';

/**
 * ✅ Get all units by building ID
 * @param {string} buildingId - Building UUID
 * @returns {Promise<IUnit[]>}
 * @description Service layer function to retrieve all units linked to a specific building.
 */
const getUnitsByBuildingId = async (buildingId: string): Promise<IUnit[]> => {
  validateRequiredField(buildingId, 'Building ID');

  const units = await unitRepository.getUnitsByBuildingId(buildingId);
  validateNotFound(units.length ? true : null, 'Units for this building');

  const transformedUnits: IUnit[] = units.map((unit) => ({
    ...unit,
    areaSqft: unit.areaSqft ? Number(unit.areaSqft) : null,
  }));
  return transformedUnits;
};

export default {
  getUnitsByBuildingId,
};
