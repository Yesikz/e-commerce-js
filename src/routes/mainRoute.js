import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productsRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import marcasRoutes from "./marcasRoutes.js";
import authRoutes from "./authRoutes.js";
import metodoPagoRouter from "./metodoPagoRoutes.js";

const mainRoute = Router();

// Users
mainRoute.use("/users", userRoutes);

// Products
mainRoute.use("/products", productRoutes);

// Categoria
mainRoute.use("/categories", categoryRoutes);

// Marcas
mainRoute.use("/marcas", marcasRoutes);

// Auth (register / login)
mainRoute.use("/auth", authRoutes);

// Metodos de Pago
mainRoute.use("/metodos-pago", metodoPagoRouter);

export default mainRoute;
