import { Router } from "express";
import {
  createCategoriaHandler,
  getAllCategoriesHandler,
  getCategoryByNameHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../handlers/categoryHandler.js";

const categoryRoutes = Router();

categoryRoutes.post("/", createCategoriaHandler);

categoryRoutes.get("/name", getCategoryByNameHandler);

categoryRoutes.get("/:id", getCategoryByIdHandler);

categoryRoutes.get("/", getAllCategoriesHandler);

categoryRoutes.put("/:id", updateCategoryHandler);

categoryRoutes.delete("/:id", deleteCategoryHandler);

export default categoryRoutes;
