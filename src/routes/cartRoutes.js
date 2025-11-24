import { Router } from "express";
import { autenticar } from "../middleware/autenticarMiddleware.js";
import {
  createCartHandler,
  getActiveCartHandler,
  getCartByIdHandler,
  getCartsByUserHandler,
  getAllCartsHandler,
  addProductToCartHandler,
  removeProductFromCartHandler,
  deleteCartHandler,
  clearCartHandler,
  checkoutCartHandler,
} from "../handlers/carritoHandler.js";

const cartRoutes = Router();

/* ===========================
   CREATE  (POST)
   =========================== */

/**
 * Crear un nuevo carrito para un usuario
 * POST http://localhost:3000/cart
 */
cartRoutes.post("/", autenticar, createCartHandler);

/**
 * Agregar un producto al carrito
 * POST http://localhost:3000/cart/:cartId/product/:productoId
 */
cartRoutes.post(
  "/:cartId/product/:productoId",
  autenticar,
  addProductToCartHandler
);

/* ===========================
   READ  (GET)
   =========================== */

/**
 * Obtener todos los carritos
 * GET http://localhost:3000/cart
 */
cartRoutes.get("/", autenticar, getAllCartsHandler);

/**
 * Obtener el carrito activo del usuario autenticado
 * GET http://localhost:3000/cart/active
 */
cartRoutes.get("/active", autenticar, getActiveCartHandler);

/**
 * Obtener todos los carritos de un usuario (filtro opcional por estado)
 * GET http://localhost:3000/cart/user/:id?estado=activo
 */
cartRoutes.get("/user/:id", autenticar, getCartsByUserHandler);

/**
 * Obtener un carrito por su ID
 * GET http://localhost:3000/cart/:id
 */
cartRoutes.get("/:id", autenticar, getCartByIdHandler);

/* ===========================
   UPDATE  (PUT)
   =========================== */

/**
 * Vaciar todos los productos del carrito
 * PUT http://localhost:3000/cart/:id/clear
 */
cartRoutes.put("/:id/clear", autenticar, clearCartHandler);

/* ===========================
   ACTIONS (POST) - Checkout
   =========================== */

/**
 * Finalizar un carrito y generar un pedido
 * POST http://localhost:3000/cart/:cartId/checkout
 */
cartRoutes.post("/:cartId/checkout", autenticar, checkoutCartHandler);

/* ===========================
   DELETE  (DELETE)
   =========================== */

/**
 * Eliminar un producto del carrito
 * DELETE http://localhost:3000/cart/:cartId/product/:productoId
 */
cartRoutes.delete(
  "/:cartId/product/:productoId",
  autenticar,
  removeProductFromCartHandler
);

/**
 * Eliminar un carrito completo
 * DELETE http://localhost:3000/cart/:id
 */
cartRoutes.delete("/:id", autenticar, deleteCartHandler);
/* "/:id",autenticar,autorizar("admin"), deleteCartHandler); */

export default cartRoutes;
