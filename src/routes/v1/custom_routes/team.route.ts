import { Router } from 'express';
import { teamController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';

/**
 * ✅ Team Routes
 * Handles CSV/Excel file uploads and team management
 * Base: /api/v1/teams
 */
const teamRouter = (router: Router): Router => {
  // 📥 Upload CSV or Excel file
  router.post('/upload', upload.single('file'), teamController.uploadTeams);
  router.get('/get-all-teams', teamController.getAllTeams);

  router.get('/download/excel', teamController.downloadTeamsExcel);
  router.get('/download/csv', teamController.downloadTeamsCsv);

  return router;
};

export default teamRouter;
