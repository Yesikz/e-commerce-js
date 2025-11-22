import { Router } from "express";
import { createUserHandler } from "../handlers/usuarioHandler.js";

const userRoutes = Router();

/* ===== Crear ===== */
userRoutes.post("/", createUserHandler);

export default userRoutes;
