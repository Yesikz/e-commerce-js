import {
  createCartController,
  getActiveCartController,
  getCartByIdController,
  getCartsByUserController,
  getAllCartsController,
  addProductToCartController,
  removeProductFromCartController,
  deleteCartController,
  clearCartController,
  checkoutCartController,
} from "../controllers/carritoControllers.js";

import { validateCarrito } from "../validations/carritoValidation.js";

export const createCartHandler = async (req, res, next) => {
  try {
    // se llam al middleware de autenticació
    const usuarioId = req.user.id;

    const nuevoCarrito = await createCartController(usuarioId);

    return res.status(201).json({
      success: true,
      message: "Carrito creado correctamente",
      data: nuevoCarrito,
    });
  } catch (err) {
    next(err);
  }
};

// Obtiene el carrito activo de un usuario (si existe).
export const getActiveCartHandler = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;

    const response = await getActiveCartController(usuarioId);

    // Si no hay carrito activo
    if (!response.data) {
      return res.status(404).json({
        success: false,
        message: response.message,
        data: null,
      });
    }

    // Si existe carrito
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Obtiene un carrito por su ID
export const getCartByIdHandler = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;

    const response = await getCartByIdController(cartId);

    // Si no existe el carrito
    if (!response.data) {
      return res.status(404).json({
        success: false,
        message: response.message,
        data: null,
      });
    }

    // Si existe
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Obtiene todos los carritos (activos o finalizados) de un usuario
export const getCartsByUserHandler = async (req, res, next) => {
  try {
    const { id: usuarioId } = req.params;
    const { estado } = req.query;

    const response = await getCartsByUserController(usuarioId, estado);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

//Obtiene todos los carritos
export const getAllCartsHandler = async (req, res, next) => {
  try {
    const response = await getAllCartsController();

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Agregar un producto al carrito
export const addProductToCartHandler = async (req, res, next) => {
  try {
    const { cartId, productoId } = req.params;
    const { cantidad } = req.body;

    const response = await addProductToCartController(
      cartId,
      productoId,
      cantidad
    );

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Eliminar un producto del carrito.
export const removeProductFromCartHandler = async (req, res, next) => {
  try {
    const { cartId, productoId } = req.params;

    const result = await removeProductFromCartController(cartId, productoId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// Borrar un carrito completo
export const deleteCartHandler = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;

    const response = await deleteCartController(cartId);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Vaciar los productos de un carrito sin eliminar el carrito.
export const clearCartHandler = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;

    const response = await clearCartController(cartId);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// Finalizar el carrito y crear un pedido asociado
export const checkoutCartHandler = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { metodoPago } = req.body;

    const response = await checkoutCartController(cartId, metodoPago);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
