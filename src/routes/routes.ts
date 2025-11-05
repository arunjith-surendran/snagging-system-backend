import { Express, Router, Response, Request } from 'express';
import { adminRouter, authRouter, buildingRouter, issueRouter, issueTypeRouter, teamRouter, unitRouter, userRouter } from './v1/custom_routes';
import projectRouter from './v1/custom_routes/project.route';

export const routes = (app: Express) => {
  const router = Router();
  const v1Router = Router();

  v1Router.use('/admin', adminRouter(Router()));
  v1Router.use('/teams', teamRouter(Router()));
  v1Router.use('/projects', projectRouter(Router()));
  v1Router.use('/buildings', buildingRouter(Router()));
  v1Router.use('/units', unitRouter(Router()));
  v1Router.use('/issue-types', issueTypeRouter(Router()));
  v1Router.use('/users', userRouter(Router()));
  v1Router.use('/auth', authRouter(Router()));
  v1Router.use('/issues', issueRouter(Router()));

  router.use('/api/v1', v1Router);

  router.get('/', (_req: Request, res: Response) => {
    res.send('This is the router home page');
  });

  app.use(router);
};

export default routes;
