import { Router } from 'express';
import { adminController } from '../../../controllers';

const adminRouter = (router: Router) => {
  router.route('/register').post(adminController.addAdmin);

  return router;
};

export default adminRouter;
