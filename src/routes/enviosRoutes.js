// src/routes/enviosRoutes.js
import { Router } from "express";
import {
  createEnvioHandler,
  getAllEnviosHandler,
  getEnvioByIdHandler,
  getEnviosByPedidoHandler,
  updateEnvioHandler,
  updateEnvioEstadoHandler,
  deleteEnvioHandler,
} from "../handlers/enviosHandler.js";

const enviosRoutes = Router();

/* 
 * GET
*/

// Listar envíos (con filtros opcionales ?estado=&pedido=)
enviosRoutes.get("/", getAllEnviosHandler);

// Obtener envío por ID
enviosRoutes.get("/:id", getEnvioByIdHandler);

// Obtener envíos por pedido
enviosRoutes.get("/pedido/:pedidoId", getEnviosByPedidoHandler);

/* 
 * POST
*/

// Crear envío
enviosRoutes.post("/", createEnvioHandler);

/* 
 * PUT / PATCH
*/

// Actualizar envío completo
enviosRoutes.put("/:id", updateEnvioHandler);

// Actualizar solo el estado del envío
enviosRoutes.patch("/:id/estado", updateEnvioEstadoHandler);

/* 
 * DELETE
*/

// Eliminar envío
enviosRoutes.delete("/:id", deleteEnvioHandler);

export default enviosRoutes;