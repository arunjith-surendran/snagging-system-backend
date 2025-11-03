import { Router } from "express";
import { issueTypeController } from "../../../controllers";
import { verifyAuth } from "../../../middlewares/auth/verify-auth";
import { authorizeModule } from "../../../middlewares/auth/authorize-access";

const issueTypeRouter = (router: Router): Router => {
  router.get("/get-all", verifyAuth, authorizeModule("ADMIN"), issueTypeController.getAllIssueTypes);
  router.get("/get/:id", verifyAuth, authorizeModule("ADMIN"), issueTypeController.getIssueTypeById);
  router.post("/create", verifyAuth, authorizeModule("ADMIN"), issueTypeController.createIssueType);
  router.put("/update/:id", verifyAuth, authorizeModule("ADMIN"), issueTypeController.updateIssueType);
  router.delete("/delete/:id", verifyAuth, authorizeModule("ADMIN"), issueTypeController.deleteIssueType);
  return router;
};

export default issueTypeRouter;
