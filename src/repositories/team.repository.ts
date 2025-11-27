import { db } from '../db_connection/postgres/connection';
import { teams } from '../models/teams/teams.schema';
import { NewTeam, Team } from '../models/teams/teams.schema';
import { paginate } from '../helper/pagination.helper';
import TeamEntity from '../entities/team.entity';
import { eq } from "drizzle-orm";

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

  try {
    const result = await db
      .insert(teams)
      .values(data) // ✅ insert all provided columns
      .onConflictDoNothing({ target: teams.teamName })
      .returning({ id: teams.id, teamName: teams.teamName });

    console.log(`✅ Inserted ${result.length} team(s):`, result.map(r => r.teamName));
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
const getAllTeams = async (pageNumber: number, pageSize: number): Promise<{ teams: Team[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<Team>(teams, { pageNumber, pageSize });
  return { teams: data, totalCount, hasNext };
};

/**
 * ✅ Get All Teams for Export
 * @function getAllTeamsForExport
 * @description Fetches all team records from the database without pagination,
 * @returns {Promise<Team[]>} - Returns an array of all team records from the database.
 */
const getAllTeamsForExport = async (): Promise<Team[]> => {
  const result = await db.select().from(teams);
  return result;
};

/**
 * ✅ Create Team (Admin)
 * @function createTeam
 * @param {TeamEntity} newTeam - Team entity object to insert
 * @returns {Promise<Team>} - Created team record
 * @description Inserts a single new team record into the database, ensuring null values are cleaned.
 */
const createTeam = async (newTeam: TeamEntity): Promise<Team> => {
  // 🧹 Clean up nulls → undefined
  const cleanedTeam: NewTeam = {
    documentStatus: newTeam.documentStatus,
    teamName: newTeam.teamName,
    teamInitials: newTeam.teamInitials ?? undefined,
    teamType: newTeam.teamType, // ✅ already correct enum type
    teamAddress: newTeam.teamAddress ?? undefined,
    teamTelephone: newTeam.teamTelephone ?? undefined,
    teamEmail: newTeam.teamEmail ?? undefined,
    teamRole: newTeam.teamRole ?? undefined,
    active: newTeam.active,
    createdUser: newTeam.createdUser ?? undefined,
    createdAt: newTeam.createdAt ?? new Date(),
    updatedUser: newTeam.updatedUser ?? undefined,
    updatedAt: newTeam.updatedAt ?? new Date(),
  };

  const [inserted] = await db.insert(teams).values(cleanedTeam).returning();
  return inserted;
};

/**
 * ✅ Find Team by ID
 * @function findById
 * @param {string} id - Team ID
 * @returns {Promise<Team | null>} - Found team or null if not exists
 * @description Retrieves a specific team record by its ID.
 */
const findById = async (id: string): Promise<Team | null> => {
  const result = await db.select().from(teams).where(eq(teams.id, id));
  return result.length ? result[0] : null;
};

/**
 * ✅ Update Team by ID
 * @function updateTeam
 * @param {string} id - Team ID
 * @param {Partial<NewTeam>} updatedData - Fields to update
 * @returns {Promise<Team>} - Updated team record
 * @description Updates an existing team record in the database.
 */
const updateTeam = async (id: string, updatedData: Partial<NewTeam>): Promise<Team> => {
  const [updated] = await db.update(teams).set(updatedData).where(eq(teams.id, id)).returning();
  return updated;
};

/**
 * ✅ Delete Team by ID
 * @function deleteTeam
 * @param {string} id - Team ID
 * @returns {Promise<void>}
 * @description Deletes a specific team record from the database.
 */
const deleteTeam = async (id: string): Promise<void> => {
  await db.delete(teams).where(eq(teams.id, id));
};

export default {
  bulkInsert,
  getAllTeams,
  getAllTeamsForExport,
  createTeam,
  findById,
  updateTeam,
  deleteTeam,
};
