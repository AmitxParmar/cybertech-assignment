import { Request, Response } from "express";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { updateProfileSchema } from "../utils/validators";

export async function getUserProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await User.findById(userId).select("name email bio createdAt");
  if (!user) return res.status(404).json({ message: "User not found" });

  const posts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
    },
    posts: posts.map((p) => ({
      id: p._id,
      content: p.content,
      createdAt: p.createdAt,
    })),
  });
}

export async function updateMyProfile(req: Request, res: Response) {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
  }
  const updates = parsed.data;
  const user = await User.findByIdAndUpdate(req.userId!, updates, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user._id, name: user.name, email: user.email, bio: user.bio });
}
