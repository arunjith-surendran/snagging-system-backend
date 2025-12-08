import { Router } from 'express';
import { issueTypeController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const issueTypeRouter = (router: Router): Router => {
  router.post('/upload', verifyAuth, authorizeModule('ISSUE_TYPES'), upload.single('file'), issueTypeController.uploadIssueTypes);

  router.get('/get-all-types', verifyAuth, authorizeModule('ISSUE_TYPES'), issueTypeController.getAllIssueTypes);

  router.get('/download/excel', verifyAuth, authorizeModule('ISSUE_TYPES'), issueTypeController.downloadIssueTypesExcel);

  router.get('/download/csv', verifyAuth, authorizeModule('ISSUE_TYPES'), issueTypeController.downloadIssueTypesCsv);

  router.post('/admin/add', verifyAuth, authorizeModule('ADMIN'), issueTypeController.addIssueType);

  router.put('/admin/update/:id', verifyAuth, authorizeModule('ADMIN'), issueTypeController.updateIssueType);

  router.delete('/admin/delete/:id', verifyAuth, authorizeModule('ADMIN'), issueTypeController.deleteIssueType);

  router.get('/admin/get/:id', verifyAuth, authorizeModule('ADMIN'), issueTypeController.getIssueTypeById);

  return router;
};

export default issueTypeRouter;
