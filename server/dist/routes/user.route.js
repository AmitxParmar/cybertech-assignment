"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/:userId", user_controller_1.getUserProfile);
router.patch("/me", auth_1.requireAuth, user_controller_1.updateMyProfile);
exports.default = router;
