import { db } from "../db_connection/postgres/connection";
import { units, Unit } from "../models/units/units.schema";
import { eq } from "drizzle-orm";

/**
 * ✅ Get all units by building ID
 * @param {string} buildingId - UUID of the building
 * @returns {Promise<Unit[]>}
 * @description Repository function to retrieve units for a given building ID.
 */
const getUnitsByBuildingId = async (buildingId: string): Promise<Unit[]> => {
  const result = await db.select().from(units).where(eq(units.buildingId, buildingId));
  return result;
};

export default {
  getUnitsByBuildingId,
};
