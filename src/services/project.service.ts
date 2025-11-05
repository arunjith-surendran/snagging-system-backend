import projectRepository from '../repositories/project.repository';
import { IProject } from '../models/projects/projects.model';
import { validateRequiredField, validateNotFound, validateUserAuthorization } from '../utils/validators';
// import ProjectEntity from '../entities/project.entity';

/**
 * ✅ Get All Projects
 * @param {string} userId - Authenticated user ID
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ projects: IProject[]; hasNext: boolean; totalCount: number }>}
 * @description Fetches all projects with pagination support.
 */
const getAllProjects = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
): Promise<{ projects: IProject[]; hasNext: boolean; totalCount: number }> => {
  validateUserAuthorization(userId);

  const { projects, hasNext, totalCount } = await projectRepository.getAllProjects(pageNumber, pageSize);

  return { projects, hasNext, totalCount };
};

/**
 * ✅ Get Project by ID
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Project ID
 * @returns {Promise<IProject>}
 * @description Fetches a single project by its ID.
 */
const getProjectById = async (userId: string, id: string): Promise<IProject> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'projectId');

  const project = await projectRepository.getProjectById(id);
  validateNotFound(project, 'Project');

  return project!;
};

// /**
//  * ✅ Create Project Service
//  * @param {string} createdBy - Authenticated admin user ID
//  * @param {IProject} projectData - Request body
//  */
// // const createProject = async (
// //   createdBy: string,
// //   projectData: IProject
// // ): Promise<IProject> => {
// //   validateUserAuthorization(createdBy);

// //   // 🧾 Required field checks
// //   validateRequiredField(projectData.projectName, "Project Name");
// //   validateRequiredField(projectData.projectCode, "Project Code");

// //   // 🕒 Convert safe dates
// //   const toDate = (v: string | Date | null | undefined): Date | null =>
// //     v ? new Date(v) : null;

// //   // 🧱 Create Entity (similar to UserEntity)
// //   const projectEntity = new ProjectEntity(
// //     projectData.documentStatus ?? true,
// //     projectData.projectCode.trim(),
// //     projectData.projectName.trim(),
// //     projectData.description ?? null,
// //     projectData.clientName ?? null,
// //     // projectData.location ?? null,
// //     // projectData.phase ?? null,
// //     // projectData.assignedInspectorId ?? null,
// //     // projectData.assignedContractorId ?? null,
// //     // projectData.assignedSubContractorId ?? null,
// //     // projectData.assignedVerifierId ?? null,
// //     // toDate(projectData.startDate),
// //     // toDate(projectData.endDate),
// //     // createdBy,
// //     // new Date(),
// //     // createdBy,
// //     // new Date()
// //   );

// //   const createdProject = await projectRepository.createProject(projectEntity);
// //   return createdProject;
// // };

// // // /**
// // //  * ✅ Update Project
// // //  * @param {string} userId - Authenticated user ID
// // //  * @param {string} projectId - Project ID to update
// // //  * @param {Partial<IProject>} updateData - Fields to update
// // //  * @returns {Promise<IProject>}
// // //  * @description Updates an existing project record.
// // //  */
// // // const updateProject = async (userId: string, projectId: string, updateData: Partial<IProject>): Promise<IProject> => {
// // //   validateUserAuthorization(userId);
// // //   validateRequiredField(projectId, 'projectId');

// // //   const updated = await projectRepository.updateProject(projectId, {
// // //     ...updateData,
// // //     updatedUser: userId,
// // //   });

// // //   validateNotFound(updated, 'Project');
// // //   return updated;
// // // };

// // /**
// //  * ✅ Delete Project
// //  * @param {string} userId - Authenticated user ID
// //  * @param {string} projectId - Project ID
// //  * @returns {Promise<void>}
// //  * @description Deletes a project from the database.
// //  */
// // const deleteProject = async (userId: string, projectId: string): Promise<void> => {
// //   validateUserAuthorization(userId);
// //   validateRequiredField(projectId, 'projectId');
// //   await projectRepository.deleteProject(projectId);
// // };

// // /**
// //  * ✅ Assign Team to Project
// //  * @param {string} userId - Authenticated user ID
// //  * @param {string} projectId - Project ID
// //  * @param {string} teamId - Team ID to assign
// //  * @returns {Promise<{ projectId: string; teamId: string }>}
// //  * @description Assigns a specific team to a project.
// //  */
// // const assignTeamToProject = async (userId: string, projectId: string, teamId: string): Promise<{ projectId: string; teamId: string }> => {
// //   validateUserAuthorization(userId);
// //   validateRequiredField(projectId, 'projectId');
// //   validateRequiredField(teamId, 'teamId');

// //   await projectRepository.assignTeamToProject(projectId, teamId);
// //   return { projectId, teamId };
// // };

// // /**
// //  * ✅ Get Projects Assigned to Inspector
// //  * @param {string} userId - Inspector user ID
// //  * @returns {Promise<IProject[]>}
// //  * @description Fetches projects assigned to an inspector team.
// //  */
// // const getProjectsByInspector = async (userId: string): Promise<IProject[]> => {
// //   validateUserAuthorization(userId);
// //   return await projectRepository.getProjectsByInspector(userId);
// // };

// // /**
// //  * ✅ Get Projects Assigned to Contractor
// //  * @param {string} userId - Contractor user ID
// //  * @returns {Promise<IProject[]>}
// //  * @description Fetches projects assigned to a contractor team.
// //  */
// // const getProjectsByContractor = async (userId: string): Promise<IProject[]> => {
// //   validateUserAuthorization(userId);
// //   return await projectRepository.getProjectsByContractor(userId);
// // };

// // /**
// //  * ✅ Get Projects Assigned to Sub-Contractor
// //  * @param {string} userId - Sub-contractor user ID
// //  * @returns {Promise<IProject[]>}
// //  * @description Fetches projects assigned to a sub-contractor team.
// //  */
// // const getProjectsBySubContractor = async (userId: string): Promise<IProject[]> => {
// //   validateUserAuthorization(userId);
// //   return await projectRepository.getProjectsBySubContractor(userId);
// // };

export default {
  getAllProjects,
  getProjectById,
  // createProject,
  // updateProject,
  // deleteProject,
  // assignTeamToProject,
  // getProjectsByInspector,
  // getProjectsByContractor,
  // getProjectsBySubContractor,
};
