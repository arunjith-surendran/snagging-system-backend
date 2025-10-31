import { Router } from 'express';
import { projectController } from '../../../controllers';


const projectRouter = (router: Router) => {

  router.route('/get-all').get(projectController.getAllProjects);

  return router;
};

export default projectRouter;
