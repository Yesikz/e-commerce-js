import { Router } from "express";
import { registerHandler, loginHandler } from "../handlers/authHandler.js";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);

export default authRoutes;
