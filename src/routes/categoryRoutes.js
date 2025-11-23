import { Router } from "express";
import {
  createCategoriaHandler,
  /* GET */
  getAllCategoriesHandler,
  getAllCategoryStatsHandler,
  getCategoryByStatusHandler,
  getCategoryByNameHandler,
  getCategoryByIdHandler,
  // PUT - PATCH
  updateCategoryHandler,
  restoreCategoryHandler,
  // Delete
  deleteSoftCategoryHandler,
  deleteCategoryHandler,
} from "../handlers/categoryHandler.js";

const categoryRoutes = Router();

/* ==========
   CREATE
 ========== */

// Crear una nueva categoría
categoryRoutes.post("/", createCategoriaHandler); // Crear una nueva categoría

/* ==========
   READ
 ========== */

// Obtener todas las categorías
categoryRoutes.get("/", getAllCategoriesHandler); // GET /categories/

// Obtener estadísticas generales de categorías
categoryRoutes.get("/stats", getAllCategoryStatsHandler); // GET /categories/stats

// Filtrar categorías por estado (activas/inactivas)
categoryRoutes.get("/status", getCategoryByStatusHandler); // GET /categories/status

// Buscar categorías por nombre (query param: ?name=...)
categoryRoutes.get("/name", getCategoryByNameHandler); // GET /categories/name

// Obtener una categoría por ID
categoryRoutes.get("/:id", getCategoryByIdHandler); // GET /categories/:id

/* ==========
   UPDATE
 ========== */

// Restaurar una categoría eliminada (soft delete)
categoryRoutes.patch("/restore/:id", restoreCategoryHandler); // PATCH /categories/restore/:id

// Actualizar datos de una categoría
categoryRoutes.put("/:id", updateCategoryHandler); // PUT /categories/:id

/* ==========
   DELETE
 ========== */

// Eliminación lógica (soft delete)
categoryRoutes.delete("/soft/:id", deleteSoftCategoryHandler); // DELETE /categories/soft/:id

// Eliminación definitiva de una categoría
categoryRoutes.delete("/:id", deleteCategoryHandler); // DELETE /categories/:id

export default categoryRoutes;
