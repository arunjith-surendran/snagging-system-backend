import { Router } from 'express';
import { issueController } from '../../../controllers';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const issueRouter = (router: Router): Router => {
  // 🔹 Admin – Full Access
  router.get('/get-all', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.getAllIssues);
  router.get('/get/:id', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.getIssueById);
  router.post('/create', verifyAuth, authorizeModule('PROJECTS'), issueController.createIssue);
  router.put('/update/:id', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.updateIssue);
  router.delete('/delete/:id', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.deleteIssue);

  // 🔹 Inspector Team – Can create issues and assign to other teams
  router.get('/inspector/issues', verifyAuth, authorizeModule('PROJECTS'), issueController.getIssuesByInspector);
  router.post('/inspector/create/:projectId', verifyAuth, authorizeModule('PROJECTS'), issueController.createIssueByInspector);

  // 🔹 Contractor Team – Can update their assigned issues (Open → Fixed/In Progress)
  router.get('/contractor/issues', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.getIssuesByContractor);
  router.put('/contractor/update-status/:issueId', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.updateIssueStatusByContractor);

  // 🔹 Sub-Contractor Team – Similar limited access as contractor
  router.get('/sub-contractor/issues', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.getIssuesBySubContractor);
  router.put('/sub-contractor/update-status/:issueId', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.updateIssueStatusBySubContractor);

  // 🔹 Verify / QA Team – Can verify or reopen issues
  router.get('/verify/issues', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.getIssuesForVerification);
  router.put('/verify/update-status/:issueId', verifyAuth, authorizeModule('ISSUE_TYPES'), issueController.verifyOrReopenIssue);

  return router;
};

export default issueRouter;
