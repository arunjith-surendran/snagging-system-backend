import { Router } from "express";
import { buildingController } from "../../../controllers";
    
const buildingRouter = (router: Router) => {
  router.route("/get-building-details/:projectId").get(buildingController.getBuildingsByProjectId);

  return router;
};

export default buildingRouter;
