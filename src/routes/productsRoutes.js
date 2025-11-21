import { Router } from "express";
import { createProducts, getProducts, updateProduct, deleteProduct } from "../handlers/productsHandler.js";

const productsRouter = Router();

// Rutas de productos

//Get
//Todos los productos
productsRouter.get("/products", getProducts);

//Post
productsRouter.post("/products", createProducts);

//Put
productsRouter.put("/products/:id", updateProduct);

//Delete
productsRouter.delete("/products/:id", deleteProduct);

export default productsRouter;
