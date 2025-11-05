import { Router } from "express";
import { unitController } from "../../../controllers";
import { verifyAuth } from "../../../middlewares/auth/verify-auth";
import { authorizeModule } from "../../../middlewares/auth/authorize-access";


const unitRouter = (router: Router) => {
  router.get('/get-all', verifyAuth, authorizeModule('UNITS'), unitController.getAllUnits);
  router.get('/get/:id', verifyAuth, authorizeModule('UNITS'), unitController.getUnitsByProjectId);
  // router.get("/", verifyAuth , unitController.getUnitsByProjectId);
  return router;
};

export default unitRouter;
