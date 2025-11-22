import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productsRoutes.js";

const mainRoute = Router();

// Users
mainRoute.use("/users", userRoutes);

// Products
mainRoute.use("/products", productRoutes);

export default mainRoute;
