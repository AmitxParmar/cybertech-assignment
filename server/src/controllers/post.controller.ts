import { Request, Response } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { createPostSchema } from "../utils/validators";
import z from "zod";

export async function createPost(req: Request, res: Response) {
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: z.treeifyError(parsed.error),
    });
  }
  const post = await Post.create({
    author: req.userId!,
    content: parsed.data.content,
  });
  const author = await User.findById(req.userId!).select("name");
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: {
      id: post._id,
      content: post.content,
      createdAt: post.createdAt,
      author: { id: author?._id, name: author?.name },
    },
  });
}

export async function getFeed(_req: Request, res: Response) {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .lean();

  res.json({
    success: true,
    message: "Posts fetched successfully",
    data: posts.map((p) => ({
      id: p._id,
      content: p.content,
      createdAt: p.createdAt,
      author: { id: (p as any).author?._id, name: (p as any).author?.name },
    })),
  });
}

export async function getUserPosts(req: Request, res: Response) {
  const { userId } = req.params;
  const posts = await Post.find({ author: userId })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    message: "User posts fetched successfully",
    data: posts.map((p) => ({
      id: p._id,
      content: p.content,
      createdAt: p.createdAt,
      authorId: p.author,
    })),
  });
}
