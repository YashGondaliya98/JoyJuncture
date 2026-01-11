import express from "express";
import { login, register, getProfile, getUserProfile, getWallet, getAdminProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile/:userId", getProfile);
router.get("/user/profile/:userId", getUserProfile);
router.get("/user/wallet/:userId", getWallet);
router.get("/admin/profile/:adminId", getAdminProfile);

export default router;