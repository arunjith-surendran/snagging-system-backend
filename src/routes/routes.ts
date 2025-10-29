import { Express, Router, Response } from 'express';
import { adminRouter, profileRouter } from './v1/custom_routes';

export const routes = (app: Express) => {
  const router = Router();

  // custom route goes here
  router.use('/api/v1/admin', adminRouter(router));
  router.use('/api/v1/profile', profileRouter(router));
  // default rout
  router.get('/', (res: Response) => {
    res.send('This is the router home page');
  });

  app.use(router);
};

export default routes;
