import express from "express";
import { 
    login, 
    logout, 
    register, 
    updateProfile,
    checkAuth
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, profileUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, profileUpload, updateProfile);
router.route("/check-auth").get(isAuthenticated, checkAuth);

export default router;