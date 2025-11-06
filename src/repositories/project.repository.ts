import { db } from "../db_connection/postgres/connection";
import ProjectEntity from "../entities/project.entity";
import { paginate } from "../helper/pagination.helper";
import { IProject } from "../models/projects/projects.model";
import { projects } from "../models/projects/projects.schema";
import { eq } from "drizzle-orm";

/**
 * ✅ Get all projects (Paginated)
 * @function getAllProjects
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ projects: IProject[]; totalCount: number; hasNext: boolean }>}
 * @description Fetches paginated project records from the database.
 */
const getAllProjects = async (
  pageNumber: number,
  pageSize: number
): Promise<{ projects: IProject[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IProject>(projects, {
    pageNumber,
    pageSize,
  });
  return { projects: data, totalCount, hasNext };
};

/**
 * ✅ Get Project by ID
 * @function getProjectById
 * @param {string} id - Project ID
 * @returns {Promise<IProject | null>}
 * @description Retrieves a project record by its ID.
 */
const getProjectById = async (id: string): Promise<IProject | null> => {
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result.length ? result[0] : null;
};

/**
 * ✅ Create Project Repository
 *  @function getProjectById
 * @param {string} id - Project ID
 * @returns {Promise<IProject | null>}
 * @description 
 */
const createProject = async (newProject: ProjectEntity): Promise<IProject> => {
  const cleaned:any = Object.fromEntries(
    Object.entries(newProject).map(([k, v]) => [k, v ?? null])
  );

  const [inserted] = await db
    .insert(projects)
    .values(cleaned)
    .onConflictDoNothing({ target: projects.projectCode }) // optional safeguard
    .returning();

  return inserted;
};
/**
 * ✅ Update Project
 * @function updateProject
 * @param {string} id - Project ID
 * @param {Partial<IProject>} data - Updated fields
 * @returns {Promise<IProject>}
 * @description Updates an existing project record in the database.
 */
const updateProject = async (id: string, data: Partial<IProject>): Promise<IProject> => {
  // 🧹 Normalize only date fields
  const normalizeDate = (value: unknown): Date | null =>
    value ? new Date(value as string | number | Date) : null;

  // 🧱 Build a safe update payload (remove null/undefined)
  const safeData = Object.fromEntries(
    Object.entries({
      ...data,
      startDate: data.startDate ? normalizeDate(data.startDate) : undefined,
      endDate: data.endDate ? normalizeDate(data.endDate) : undefined,
      updatedAt: new Date(), // always refresh last updated timestamp
    }).filter(([_, value]) => value !== null && value !== undefined)
  );

  // 💾 Perform the update safely
  const [updated] = await db
    .update(projects)
    .set(safeData as typeof projects.$inferInsert)
    .where(eq(projects.id, id))
    .returning();

  return updated;
};

/**
 * ✅ Delete Project
 * @function deleteProject
 * @param {string} id - Project ID
 * @returns {Promise<void>}
 * @description Deletes a project record by ID.
 */
const deleteProject = async (id: string): Promise<void> => {
  await db.delete(projects).where(eq(projects.id, id));
};

/**
 * ✅ Assign Team to Project
 * @function assignTeamToProject
 * @param {string} projectId - Project ID
 * @param {string} teamId - Team ID
 * @returns {Promise<void>}
 * @description Assigns a team to the given project (default: contractor team).
 */
const assignTeamToProject = async (projectId: string, teamId: string): Promise<void> => {
  await db.update(projects).set({ assignedContractorId: teamId }).where(eq(projects.id, projectId));
};

/**
 * ✅ Get Projects Assigned to Inspector
 * @function getProjectsByInspector
 * @param {string} userId - Inspector user ID
 * @returns {Promise<IProject[]>}
 * @description Returns all projects assigned to the inspector user/team.
 */
const getProjectsByInspector = async (userId: string): Promise<IProject[]> => {
  const result = await db.select().from(projects).where(eq(projects.assignedInspectorId, userId));
  return result;
};

/**
 * ✅ Get Projects Assigned to Contractor
 * @function getProjectsByContractor
 * @param {string} userId - Contractor user ID
 * @returns {Promise<IProject[]>}
 * @description Returns all projects assigned to the contractor user/team.
 */
const getProjectsByContractor = async (userId: string): Promise<IProject[]> => {
  const result = await db.select().from(projects).where(eq(projects.assignedContractorId, userId));
  return result;
};

/**
 * ✅ Get Projects Assigned to Sub-Contractor
 * @function getProjectsBySubContractor
 * @param {string} userId - Sub-contractor user ID
 * @returns {Promise<IProject[]>}
 * @description Returns all projects assigned to the sub-contractor team.
 */
const getProjectsBySubContractor = async (userId: string): Promise<IProject[]> => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.assignedSubContractorId, userId));
  return result;
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  assignTeamToProject,
  getProjectsByInspector,
  getProjectsByContractor,
  getProjectsBySubContractor,
};
