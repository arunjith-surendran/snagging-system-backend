import { Router } from "express";
import { profileController } from "../../../controllers";
import { verifyUser } from "../../../middlewares/auth/verify-user";
import { verifyAdmin } from "../../../middlewares/auth/verify-admin";

/**
 * ✅ Profile Routes
 * Handles user and admin profile operations
 *
 * Base route: /api/v1/profile
 */
const profileRouter = (router: Router): Router => {
  // 🧩 User routes
  router.route("/get-profile").get(verifyUser, profileController.getProfile);
  router.route("/update-profile").put(verifyUser, profileController.updateProfile);

  // 🧩 Admin routes
  router.route("/get-all-profiles").get( profileController.getAllProfiles);
  router.route("/get-profile-details/:userId").get(verifyAdmin, profileController.getProfileDetails);

  return router;
};

export default profileRouter;
