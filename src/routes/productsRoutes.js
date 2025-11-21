import { Router } from "express";

const productsRouter = Router();

// Rutas de productos

//Get
//Todos los productos
productsRouter.get("/products", (req, res) => {
  res.send("Lista de productos");
});

//Post
productsRouter.post("/products", (req, res) => {
  res.send("Creando un producto");
});

//Put
productsRouter.put("/products/:id", (req, res) => {
  res.send(`Actualizando el producto con id ${req.params.id}`);
});

//Delete
productsRouter.delete("/products/:id", (req, res) => {
  res.send(`Eliminando el producto con id ${req.params.id}`);
});

export default productsRouter;
