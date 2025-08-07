"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.accessToken;
    let token;
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    else if (cookieToken) {
        token = cookieToken;
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
