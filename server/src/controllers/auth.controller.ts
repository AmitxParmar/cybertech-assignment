import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { loginSchema, registerSchema } from "../utils/validators";
import { signAccessToken } from "../utils/jwt";
import { env } from "../config/env";
import z from "zod";

/* Register controller */
export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      data: { errors: z.treeifyError(parsed.error) },
    });
  }
  const { name, email, password, bio } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: "Email already in use",
      data: null,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, bio });

  const token = signAccessToken({ userId: (user._id as string).toString() });
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
export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      data: { errors: z.treeifyError(parsed.error) },
    });
  }
  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
      data: null,
    });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
      data: null,
    });
  }

  const token = signAccessToken({ userId: (user._id as string).toString() });
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
export async function me(req: Request, res: Response) {
  const userId = req.userId!;
  const user = await User.findById(userId);
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
export async function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.json({
    success: true,
    message: "Logged out",
    data: null,
  });
}

/* Set Auth Cookie controller */
function setAuthCookie(res: Response, token: string) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSecure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}
