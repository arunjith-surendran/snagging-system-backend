import { Express, Router, Response, Request } from "express";
import { adminRouter, profileRouter, teamRouter } from "./v1/custom_routes";

export const routes = (app: Express) => {
  const router = Router();

  const v1Router = Router();

  v1Router.use("/admin", adminRouter(Router()));
  v1Router.use("/profile", profileRouter(Router()));
  v1Router.use("/teams", teamRouter(Router()));

  router.use("/api/v1", v1Router);


  router.get("/", (_req: Request, res: Response) => {
    res.send("This is the router home page");
  });

  app.use(router);
};

export default routes;
