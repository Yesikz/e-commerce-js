import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getAllUserStatsHandler,
  getUserByIdHandler,
  getUsersByEmailHandler,
  getUsersByNameHandler,
  getUsersByRoleHandler,
  getUsersByStatusHandler,
  /* update */
  updateUserHandler,
  updateUserStatusHandler,
  /* delete */
  deleteSoftUserHandler,
  deleteUserHandler,
} from "../handlers/usuarioHandler.js";

import { autenticar } from "../middleware/autenticarMiddleware.js";
const userRoutes = Router();

/* ===== Crear ===== */
userRoutes.post("/", createUserHandler);

/* ===== Rutas Fijas ===== */
userRoutes.get("/stats", getAllUserStatsHandler);
userRoutes.get("/email", getUsersByEmailHandler);
userRoutes.get("/name", getUsersByNameHandler);
userRoutes.get("/rol", getUsersByRoleHandler);
userRoutes.get("/status", getUsersByStatusHandler);
userRoutes.get("/test", autenticar, getAllUsersHandler);

/* userRoutes.get('/token', verifyToken, authorizationAdmin, getAllUsersHandler); */

/* ===== Rutas Generales ===== */
userRoutes.get("/", getAllUsersHandler);
userRoutes.get("/:id", getUserByIdHandler);

/* ===== Update ===== */
userRoutes.patch("/:id/status", updateUserStatusHandler);
userRoutes.put("/:id", updateUserHandler);

/* ===== Delete ===== */
userRoutes.delete("/soft/:id", deleteSoftUserHandler);
userRoutes.delete("/:id", deleteUserHandler);

export default userRoutes;
