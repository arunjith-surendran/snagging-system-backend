import { db } from "../db_connection/postgres/connection";
import { IUnit } from "../models/units/units.model";
import { units, Unit } from "../models/units/units.schema";
import { eq,desc } from "drizzle-orm";

/**
 * ✅ Get all units by building ID
 * @param {string} projectId - UUID of the building
 * @returns {Promise<Unit[]>}
 * @description Repository function to retrieve units for a given building ID.
 */

const getAllUnits = async () : Promise<{ units: IUnit[]; totalCount: number }> => {
    // If you want joins/selected columns, build them here.
    const data = await db.select().from(units).orderBy(desc(units.createdAt));
    return { units: data as IUnit[], totalCount: data.length };
}
const getUnitsByProjectId = async (projectId: string): Promise<Unit[]> => {
  const result = await db.select().from(units).where(eq(units.projectId, projectId));
  return result;
};

export default {
  getAllUnits,
  getUnitsByProjectId,
};
