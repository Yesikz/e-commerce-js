import products from "../models/Productos.js";
import mongoose from "mongoose";

export const createProductsController = async (productsData) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  } = productsData;

  // Validación: verificar si el producto ya existe [nombre]
  const productExist = await products.findOne({ nombre });
  if (productExist) {
    const err = new Error("Producto ya agregado");
    err.status = 409;
    throw err;
  }

  // Creación del producto
  const newProduct = new products({
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  });

  await newProduct.save();

  return {
    success: true,
    message: "Producto agregado exitosamente",
    data: newProduct,
  };
};

/* trae todos los productos de la base de datos */
export const getAllProductsController = async () => {
  const productos = await products.find();

  if (!productos.length) {
    const err = new Error("No hay productos disponibles");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Productos encontrados",
    data: productos,
  };
};

/* trae los productos por id */
export const getProductsByIdControllers = async (id) => {
  const producto = await products.findById(id);

  if (!producto) {
    throw new Error("No se encontró el producto");
  }

  return {
    success: true,
    message: "Usuario encontrado",
    data: producto,
  };
};

/* trae los productos por nombre */
export const getProductsByNameControllers = async (nombre) => {
  const producto = await products.findOne( {nombre} );

  if (!producto) {
    throw new Error("No se encontró el producto");
  }

  return {
    success: true,
    message: "Producto encontrado",
    data: producto,
  };
};

/* actualiza un producto */
export const updateProductControllers = async (id, productsData) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  } = productsData;

  const newProduct = {
    nombre,
    descripcion,
    precio,
    stock,
    año,
    categoria,
    marca,
    imagenes,
  };

  const producto = await products.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  if (producto !== -1) {
    Object.assign(producto, newProduct);
  }
  return producto;
};

//Eliminar producto
export const deleteProductControllers = async (id) => {
  const producto = await products.findById(id);
  if (!producto) {
    const err = new Error(`Producto con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  const Producto = await products.findByIdAndDelete(id);

  return {
    success: true,
    message: `Producto con ID '${id}' eliminado exitosamente`,
    data: Producto,
  };
};
