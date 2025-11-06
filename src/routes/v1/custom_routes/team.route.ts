import { Router } from 'express';
import { teamController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const teamRouter = (router: Router): Router => {
  router.post('/upload', verifyAuth, authorizeModule('TEAMS'), upload.single('file'), teamController.uploadTeams);
  router.get('/get-all-teams', verifyAuth, authorizeModule('TEAMS'), teamController.getAllTeams);
  router.get('/download/excel', verifyAuth, authorizeModule('TEAMS'), teamController.downloadTeamsExcel);
  router.get('/download/csv', verifyAuth, authorizeModule('TEAMS'), teamController.downloadTeamsCsv);
  router.post('/admin/add', verifyAuth, authorizeModule('ADMIN'), teamController.addTeam);
  router.put('/admin/update/:id', verifyAuth, authorizeModule('ADMIN'), teamController.updateTeam);
  router.delete('/admin/delete/:id', verifyAuth, authorizeModule('ADMIN'), teamController.deleteTeam);
  router.get('/admin/get/:id', verifyAuth, authorizeModule('ADMIN'), teamController.getTeamById);

  return router;
};

export default teamRouter;
