import { Router } from 'express';
import { issueStatusController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const issueStatusRouter = (router: Router): Router => {
  // Upload Excel/CSV for Issue Statuses
  router.post('/upload', verifyAuth, authorizeModule('ISSUE_STATUS'), upload.single('file'), issueStatusController.uploadIssueStatuses);

  // Get all status entries
  router.get('/get-all-statuses', verifyAuth, authorizeModule('ISSUE_STATUS'), issueStatusController.getAllIssueStatuses);

  // Download Excel
  router.get('/download/excel', verifyAuth, authorizeModule('ISSUE_STATUS'), issueStatusController.downloadIssueStatusesExcel);

  // Download CSV
  router.get('/download/csv', verifyAuth, authorizeModule('ISSUE_STATUS'), issueStatusController.downloadIssueStatusesCsv);

  // Admin — Add
  router.post('/admin/add', verifyAuth, authorizeModule('ADMIN'), issueStatusController.addIssueStatus);

  // Admin — Update
  router.put('/admin/update/:id', verifyAuth, authorizeModule('ADMIN'), issueStatusController.updateIssueStatus);

  // Admin — Delete
  router.delete('/admin/delete/:id', verifyAuth, authorizeModule('ADMIN'), issueStatusController.deleteIssueStatus);

  // Admin — Get single
  router.get('/admin/get/:id', verifyAuth, authorizeModule('ADMIN'), issueStatusController.getIssueStatusById);

  return router;
};

export default issueStatusRouter;
