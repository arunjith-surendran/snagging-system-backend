import { Router } from 'express';
import { projectController } from '../../../controllers';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const projectRouter = (router: Router): Router => {
  router.get('/get-all', verifyAuth, authorizeModule('PROJECTS'), projectController.getAllProjects);
  router.get('/get/:id', verifyAuth, authorizeModule('PROJECTS'), projectController.getProjectById);
  // router.post('/create', verifyAuth, authorizeModule('ADMIN'), projectController.createProject);
  // router.put('/update/:id', verifyAuth, authorizeModule('ADMIN'), projectController.updateProject);
  // router.delete('/delete/:id', verifyAuth, authorizeModule('ADMIN'), projectController.deleteProject);
  // router.post('/assign-team/:projectId', verifyAuth, authorizeModule('ADMIN'), projectController.assignTeamToProject);
  // router.get('/inspector/projects', verifyAuth, authorizeModule('PROJECTS'), projectController.getProjectsByInspector);
  // router.get('/contractor/projects', verifyAuth, authorizeModule('ISSUE_TYPES'), projectController.getProjectsByContractor);
  // router.get('/sub-contractor/projects', verifyAuth, authorizeModule('ISSUE_TYPES'), projectController.getProjectsBySubContractor);

 
  return router;
};

export default projectRouter;
