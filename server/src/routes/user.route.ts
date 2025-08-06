import { Router } from "express";
import {
  getUserProfile,
  updateMyProfile,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:userId", getUserProfile);
router.patch("/me", requireAuth, updateMyProfile);

export default router;
