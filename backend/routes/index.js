import express from "express";

import authRoutes from "./auth.js";
import workspacesRoutes from "./workspace.js";
import projectRoutes from "./project.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspacesRoutes);
router.use("/projects", projectRoutes);

export default router;
