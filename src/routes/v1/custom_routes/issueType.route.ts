import { Router } from "express";
import { issueTypeController } from "../../../controllers";


const issueTypeRouter = (router: Router) => {

  router.route("/get-all").get(issueTypeController.getAllIssueTypes);

  return router;
};

export default issueTypeRouter;
