"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(80),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).max(100),
    bio: zod_1.z.string().max(280).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).max(100),
});
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(80).optional(),
    bio: zod_1.z.string().max(280).optional(),
});
exports.createPostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(1000),
});
