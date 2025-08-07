"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.me = me;
exports.logout = logout;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const validators_1 = require("../utils/validators");
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const zod_1 = __importDefault(require("zod"));
/* Register controller */
async function register(req, res) {
    const parsed = validators_1.registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            data: { errors: zod_1.default.treeifyError(parsed.error) },
        });
    }
    const { name, email, password, bio } = parsed.data;
    const existing = await User_1.User.findOne({ email });
    if (existing) {
        return res.status(409).json({
            success: false,
            message: "Email already in use",
            data: null,
        });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.User.create({ name, email, passwordHash, bio });
    const token = (0, jwt_1.signAccessToken)({ userId: user._id.toString() });
    setAuthCookie(res, token);
    return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
            user: { id: user._id, name: user.name, email: user.email, bio: user.bio },
            token, // include for non-cookie clients
        },
    });
}
/* Login controller */
async function login(req, res) {
    const parsed = validators_1.loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            data: { errors: zod_1.default.treeifyError(parsed.error) },
        });
    }
    const { email, password } = parsed.data;
    const user = await User_1.User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            data: null,
        });
    }
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            data: null,
        });
    }
    const token = (0, jwt_1.signAccessToken)({ userId: user._id.toString() });
    setAuthCookie(res, token);
    return res.json({
        success: true,
        message: "Login successful",
        data: {
            user: { id: user._id, name: user.name, email: user.email, bio: user.bio },
            token,
        },
    });
}
/* Get authenticated user data */
async function me(req, res) {
    const userId = req.userId;
    const user = await User_1.User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
        });
    }
    return res.json({
        success: true,
        message: "User fetched successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
        },
    });
}
/* Logout controller */
async function logout(_req, res) {
    res.clearCookie("accessToken");
    res.json({
        success: true,
        message: "Logged out",
        data: null,
    });
}
/* Set Auth Cookie controller */
function setAuthCookie(res, token) {
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: env_1.env.cookieSecure,
        sameSite: env_1.env.cookieSecure ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
}
