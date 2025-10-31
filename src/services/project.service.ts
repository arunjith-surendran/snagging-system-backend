import projectRepository from "../repositories/project.repository";
import { IProject } from "../models/projects/projects.model";

/**
 * ✅ Get all projects with pagination
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ projects: IProject[]; hasNext: boolean; totalCount: number }>}
 * @description Service layer function that fetches paginated project records.
 */
const getAllProjects = async (
  pageNumber: number,
  pageSize: number
): Promise<{ projects: IProject[]; hasNext: boolean; totalCount: number }> => {
  const { projects, hasNext, totalCount } = await projectRepository.getAllProjects(pageNumber, pageSize);
  return { projects, hasNext, totalCount };
};

export default {
  getAllProjects,
};
