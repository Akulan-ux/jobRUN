import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const singleUpload = upload.single("profilePhoto");
export const resumeUpload = upload.single("resume");
export const profileUpload = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]);