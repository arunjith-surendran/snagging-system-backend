import buildingRepository from "../repositories/building.repository";
import { IBuilding } from "../models/buildings/buildings.model";
import {
  validateRequiredField,
  validateNotFound,
} from "../utils/validators";

/**
 * ✅ Get all buildings by project ID
 * @param {string} projectId - Project UUID
 * @returns {Promise<IBuilding[]>}
 * @description Service layer function to retrieve all buildings linked to a specific project.
 */
const getBuildingsByProjectId = async (projectId: string): Promise<IBuilding[]> => {
  validateRequiredField(projectId, "Project ID");
  const buildings = await buildingRepository.getBuildingsByProjectId(projectId);
  validateNotFound(buildings.length ? true : null, "Buildings for this project");
  return buildings;
};

export default {
  getBuildingsByProjectId,
};
