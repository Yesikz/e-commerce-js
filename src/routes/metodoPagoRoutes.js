import { Router } from "express";
import {
  createMetodoPagoHandler,
  getAllMetodoPagoHandler,
  getMetodoPagoByIdHandler,
  getMetodoPagoByNameHandler,
  updateMetodoPagoHandler,
  restoreMetodoPagoHandler,
  deleteSoftMetodoPagoHandler,
  deleteMetodoPagoHandler,
} from "../handlers/metodoPagoHandlers.js";

const metodoPagoRouter = Router();

/* ==========
   CREATE
 ========== */

// Crear un nuevo método de pago
metodoPagoRouter.post("/", createMetodoPagoHandler); // POST /metodopago

/* ==========
   READ
 ========== */

// Obtener todos los métodos de pago
metodoPagoRouter.get("/", getAllMetodoPagoHandler); // GET /metodopago/

// Buscar método de pago por nombre (query param: ?name=...)
metodoPagoRouter.get("/name", getMetodoPagoByNameHandler); // GET /metodopago/name

// Obtener un método de pago por ID
metodoPagoRouter.get("/:id", getMetodoPagoByIdHandler); // GET /metodopago/:id

/* ==========
   UPDATE
 ========== */

// Restaurar un método de pago eliminado (soft delete)
metodoPagoRouter.patch("/restore/:id", restoreMetodoPagoHandler); // PATCH /metodopago/restore/:id

// Actualizar un método de pago
metodoPagoRouter.put("/:id", updateMetodoPagoHandler); // PUT /metodopago/:id

/* ==========
   DELETE
 ========== */

// Eliminación lógica (soft delete)
metodoPagoRouter.delete("/soft/:id", deleteSoftMetodoPagoHandler); // DELETE /metodopago/soft/:id

// Eliminación definitiva de un método de pago
metodoPagoRouter.delete("/:id", deleteMetodoPagoHandler); // DELETE /metodopago/:id

export default metodoPagoRouter;
