import { Router } from 'express';
import { userController } from '../../../controllers';
import { upload } from '../../../middlewares/upload/file-upload.middleware';
import { verifyAuth } from '../../../middlewares/auth/verify-auth';
import { authorizeModule } from '../../../middlewares/auth/authorize-access';

const userRouter = (router: Router): Router => {
  router.post('/upload', verifyAuth, authorizeModule('ADMIN'), upload.single('file'), userController.uploadUsers);
  router.get('/get-all-users', verifyAuth, authorizeModule('ADMIN'), userController.getAllUsers);
  router.post('/create-user', verifyAuth, authorizeModule('ADMIN'), userController.createUser);
  router.get('/download/excel', verifyAuth, authorizeModule('ADMIN'), userController.downloadUsersExcel);
  router.get('/download/csv', verifyAuth, authorizeModule('ADMIN'), userController.downloadUsersCsv);
  router.get('/get-profile-details', verifyAuth, userController.getProfileDetails);

  return router;
};

export default userRouter;
