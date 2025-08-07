"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const _errorHandler_1 = require("./middleware/_errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [env_1.env.clientUrl], // configure specific origin for production
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/posts", post_route_1.default);
app.use("/api/users", user_route_1.default);
app.use(_errorHandler_1.errorHandler);
exports.default = app;
