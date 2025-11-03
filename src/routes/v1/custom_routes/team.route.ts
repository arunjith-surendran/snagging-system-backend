import { Router } from 'express';
import { teamController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';

const teamRouter = (router: Router): Router => {
  
  router.post('/upload', upload.single('file'), teamController.uploadTeams);
  router.get('/get-all-teams', teamController.getAllTeams);
  router.get('/download/excel', teamController.downloadTeamsExcel);
  router.get('/download/csv', teamController.downloadTeamsCsv);
  router.post('/admin/add', teamController.addTeam);
  router.put('/admin/update/:id', teamController.updateTeam);
  router.delete('/admin/delete/:id', teamController.deleteTeam);
  router.get('/admin/get/:id', teamController.getTeamById);

  return router;
};

export default teamRouter;
