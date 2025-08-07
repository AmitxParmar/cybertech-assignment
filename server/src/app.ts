import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/_errorHandler";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: [env.clientUrl, "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
