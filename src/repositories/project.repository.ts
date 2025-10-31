import { paginate } from '../helper/pagination.helper';
import { IProject } from '../models/projects/projects.model';
import { projects } from '../models/projects/projects.schema';

/**
 * ✅ Get all projects — simple pagination only (no sorting)
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ projects: IProject[]; totalCount: number; hasNext: boolean }>}
 * @description Repository function that retrieves paginated project records from the database.
 */
const getAllProjects = async (pageNumber: number, pageSize: number): Promise<{ projects: IProject[]; totalCount: number; hasNext: boolean }> => {
  // 🚀 Use generic pagination helper for Drizzle ORM
  const { data, totalCount, hasNext } = await paginate<IProject>(projects, { pageNumber, pageSize });

  return { projects: data, totalCount, hasNext };
};

export default {
  getAllProjects,
};
