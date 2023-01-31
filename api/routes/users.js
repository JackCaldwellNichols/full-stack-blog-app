import express from "express";
import { updateProfile, getProfile } from "../controllers/user.js";


const router = express.Router()


router.put("/:uid", updateProfile)
router.get("/:uid", getProfile)

export default router