import { Router } from "express";
import { unitController } from "../../../controllers";


const unitRouter = (router: Router) => {

  router.route("/get-building-details/:buildingId").get(unitController.getUnitsByBuildingId);

  return router;
};

export default unitRouter;
