import { Request, Response } from "express";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { updateProfileSchema } from "../utils/validators";
import z from "zod";

export async function getUserProfile(req: Request, res: Response) {
  try {
    // Vercel and some proxies may lowercase or change param casing, so check both
    // Also, sometimes params may be empty if the route is not matched as expected
    let userId =
      req.params.userId ||
      req.params.userid ||
      req.query.userId ||
      req.query.userid ||
      req.body.userId ||
      req.body.userid;

    if (Array.isArray(userId)) userId = userId[0];

    console.debug("getUserProfile called with userId:", userId);

    // Validate userId parameter
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      console.warn("Invalid userId parameter:", userId);
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided",
      });
    }

    // Check if userId is a valid MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      console.warn("Invalid MongoDB ObjectId format for userId:", userId);
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(userId).select("name email bio createdAt");
    console.debug("User found:", user);

    if (!user) {
      console.warn("User not found for userId:", userId);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate("author", "name")
      .lean();

    res.json({
      success: true,
      message: "Successfully fetched user profile and posts!",
      data: {
        user,
        posts: posts.map((p) => ({
          id: p._id,
          content: p.content,
          createdAt: p.createdAt,
          author: { id: (p as any).author?._id, name: (p as any).author?.name },
        })),
      },
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateMyProfile(req: Request, res: Response) {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: z.treeifyError(parsed.error),
      });
    }
    const updates = parsed.data;
    const user = await User.findByIdAndUpdate(req.userId!, updates, {
      new: true,
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error("Error in updateMyProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
