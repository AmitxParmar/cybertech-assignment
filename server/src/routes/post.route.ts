import { Router } from "express";
import {
  createPost,
  getFeed,
  getUserPosts,
} from "../controllers/post.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/feed", getFeed);
router.get("/user/:userId", getUserPosts);
router.post("/", requireAuth, createPost);

export default router;
