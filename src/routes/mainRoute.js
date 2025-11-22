import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productsRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const mainRoute = Router();

// Users
mainRoute.use("/users", userRoutes);

// Products
mainRoute.use("/products", productRoutes);

// Categoria
mainRoute.use("/categories", categoryRoutes);

export default mainRoute;
