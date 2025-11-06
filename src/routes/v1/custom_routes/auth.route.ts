// src/routes/v1/auth.route.ts
import { Router } from "express";
import authController from "../../../controllers/auth.controller";

const authRouter = (router: Router): Router => {
  router.post("/login", authController.login);
  router.post("/refresh-token", authController.refreshToken); 
  router.post("/logout", authController.logout); 
  return router;
};

export default authRouter;
