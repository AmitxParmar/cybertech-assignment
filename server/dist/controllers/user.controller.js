"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = getUserProfile;
exports.updateMyProfile = updateMyProfile;
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
const validators_1 = require("../utils/validators");
async function getUserProfile(req, res) {
    const { userId } = req.params;
    const user = await User_1.User.findById(userId).select("name email bio createdAt");
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const posts = await Post_1.Post.find({ author: user._id })
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
async function updateMyProfile(req, res) {
    const parsed = validators_1.updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
        return res
            .status(400)
            .json({ message: "Invalid input", errors: parsed.error.flatten() });
    }
    const updates = parsed.data;
    const user = await User_1.User.findByIdAndUpdate(req.userId, updates, {
        new: true,
    });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, name: user.name, email: user.email, bio: user.bio });
}
