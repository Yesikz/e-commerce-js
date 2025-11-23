import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productsRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./authRoutes.js";

const mainRoute = Router();

// Users
mainRoute.use("/users", userRoutes);

// Products
mainRoute.use("/products", productRoutes);

// Categoria
mainRoute.use("/categories", categoryRoutes);

// Auth (register / login)
mainRoute.use("/auth", authRoutes);

export default mainRoute;
