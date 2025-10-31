import { db } from "../db_connection/postgres/connection";
import { buildings, Building } from "../models/buildings/buildings.schema";
import { eq } from "drizzle-orm";

/**
 * ✅ Get buildings by project ID
 * @param {string} projectId - UUID of the project
 * @returns {Promise<Building[]>}
 * @description Repository function to retrieve buildings for a given project ID.
 */
const getBuildingsByProjectId = async (projectId: string): Promise<Building[]> => {
  const result = await db.select().from(buildings).where(eq(buildings.projectId, projectId));
  return result;
};

export default {
  getBuildingsByProjectId,
};
