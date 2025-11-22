import { allProductsController } from "../controllers/productsControllers.js";

//trae los productos
const getProducts = (req, res) => {
  try {
    const response = allProductsController();
    res.send(response);
  } catch (error) {
    res.status(200).send(error.message );
  }
};

//crea un producto
const createProducts = (req, res) => {
  res.send("Creando un producto");
};

//actualiza un producto
const updateProduct = (req, res) => {
  res.send(`Actualizando el producto con id ${req.params.id}`);
};

//elimina un producto
const deleteProduct = (req, res) => {
  res.send(`Eliminando el producto con id ${req.params.id}`);
};

export { getProducts, createProducts, updateProduct, deleteProduct };
