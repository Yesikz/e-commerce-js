import { Router } from "express";
import { createMarcasHandler, getAllMarcasHandler, deleteMarcaHandler, getMarcaByIdHandler, updateMarcaHandler } from "../handlers/marcasHandler.js";

const marcasRoutes = Router();

/* ==========
   CREATE
 ========== */

// Crear una nueva marca
marcasRoutes.post("/", createMarcasHandler); // Crear una nueva marca

/* ==========
   TRAER
 ========== */

// Trae todas las marcas
marcasRoutes.get("/", getAllMarcasHandler); // Trae todas las marcas
// Trae marcas por ID
marcasRoutes.get("/:id", getMarcaByIdHandler); // Trae una marca por ID


/* ==========
   ELIMINAR
 ========== */

// Eliminar una marca por ID
marcasRoutes.put("/:id", updateMarcaHandler); // Actualiza marca por ID


/* ==========
   ELIMINAR
 ========== */

// Eliminar una marca por ID
marcasRoutes.delete("/:id", deleteMarcaHandler); // Eliminar una nueva marca por ID
export default marcasRoutes;