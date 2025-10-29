import { db } from "../db_connection/postgres/connection";
import { teams } from "../models/teams/teams.schema";
import { NewTeam, Team } from "../models/teams/teams.schema";
import { paginate } from "../helper/pagination.helper";

/**
 * ✅ Insert Multiple Teams (Bulk Upload)
 * @function bulkInsert
 * @description Inserts multiple team records into the database and skips duplicates by team name.
 * @param {NewTeam[]} data - Array of new team objects
 * @returns {Promise<number>} - Number of records attempted for insertion
 */
const bulkInsert = async (data: NewTeam[]): Promise<number> => {
  if (!data.length) {
    console.warn("⚠️ No data received for team insert.");
    return 0;
  }

  const cleanedData: NewTeam[] = data.map((team) => {
    const validEntries = Object.entries(team).filter(
      ([, value]) => value !== undefined && value !== null
    );
    return Object.fromEntries(validEntries) as NewTeam;
  });

  try {
    const result = await db
      .insert(teams)
      .values(cleanedData)
      .onConflictDoNothing({ target: teams.teamName }) 
      .returning({ id: teams.id, teamName: teams.teamName });

    console.log(`✅ Inserted ${result.length} team(s):`, result.map((r) => r.teamName));
    return result.length;
  } catch (err) {
    console.error("❌ Failed to insert teams:", err);
    throw err;
  }
};

/**
 * ✅ Get All Teams (Paginated)
 * @function getAllTeams
 * @description Fetches paginated list of teams using generic pagination helper.
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ teams: Team[]; totalCount: number; hasNext: boolean }>}
 */
const getAllTeams = async (
  pageNumber: number,
  pageSize: number
): Promise<{ teams: Team[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<Team>(teams, { pageNumber, pageSize });
  return { teams: data, totalCount, hasNext };
};

export default {
  bulkInsert,
  getAllTeams,
};
