import express from "express";

import authRoutes from "./auth.js";
import workspacesRoutes from "./workspace.js";
import projectRoutes from "./project.js";
import taskRoutes from "./task.js";
// import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspacesRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
// router.use("/users", userRoutes);

export default router;
