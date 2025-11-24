import { Router } from "express";
import { createProductsHandler, getAllProductsHandler, getProductsByIdHandler, updateProductHandler, deleteProductHandler } from "../handlers/productsHandler.js";

const productsRouter = Router();

// Rutas de productos

//Get
//Todos los productos
productsRouter.get("/", getAllProductsHandler);

//Producto por id
productsRouter.get("/:id", getProductsByIdHandler);

//Post
productsRouter.post("/", createProductsHandler);

//Put
productsRouter.put("/:id", updateProductHandler);

//Delete
productsRouter.delete("/:id", deleteProductHandler);

export default productsRouter;
