import fs from "fs";

/**
 * ✅ Safely delete file if exists
 */
export const safeDeleteFile = (filePath: string): void => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Deleted temp file: ${filePath}`);
    }
  } catch (err) {
    console.warn(`⚠️ Failed to delete file: ${filePath}`, err);
  }
};
