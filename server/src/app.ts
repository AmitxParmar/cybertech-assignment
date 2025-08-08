import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/_errorHandler";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import { env } from "./config/env";

const app = express();
const allowedClientUrls = [env.clientUrl, "http://localhost:3000"];

// Log every request using morgan
app.use(morgan("dev"));

app.use(
  cors({
    origin: allowedClientUrls,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Route to display allowed client URLs
app.get("/allowed-clients", (_req, res) => {
  res.json({ allowedClients: allowedClientUrls });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// Custom error logging middleware before errorHandler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Log error details
    console.error(
      `[${new Date().toISOString()}] Error on ${req.method} ${
        req.originalUrl
      }:`,
      err
    );
    next(err);
  }
);

app.use(errorHandler);

export default app;
