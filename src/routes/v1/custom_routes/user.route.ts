import { Router } from "express";
import { userController } from "../../../controllers";
import { upload } from "../../../middlewares/upload/file-upload.middleware";

/**
 * ✅ User Routes
 * Handles CSV/Excel file uploads and user management
 * Base: /api/v1/users
 */
const userRouter = (router: Router): Router => {
  // 📥 Upload Users CSV/Excel file
  router.post("/upload", upload.single("file"), userController.uploadUsers);

  // 📋 List + Create Users
  router.get("/get-all-users", userController.getAllUsers);
  router.post("/create-user", userController.createUser);

  // 📤 Download All Users (Excel/CSV)
  router.get("/download/excel", userController.downloadUsersExcel);
  router.get("/download/csv", userController.downloadUsersCsv);

  return router;
};

export default userRouter;
