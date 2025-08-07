"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = createPost;
exports.getFeed = getFeed;
exports.getUserPosts = getUserPosts;
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const validators_1 = require("../utils/validators");
const zod_1 = __importDefault(require("zod"));
async function createPost(req, res) {
    const parsed = validators_1.createPostSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: zod_1.default.treeifyError(parsed.error),
        });
    }
    const post = await Post_1.Post.create({
        author: req.userId,
        content: parsed.data.content,
    });
    const author = await User_1.User.findById(req.userId).select("name");
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
async function getFeed(_req, res) {
    const posts = await Post_1.Post.find({})
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
            author: { id: p.author?._id, name: p.author?.name },
        })),
    });
}
async function getUserPosts(req, res) {
    const { userId } = req.params;
    const posts = await Post_1.Post.find({ author: userId })
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
