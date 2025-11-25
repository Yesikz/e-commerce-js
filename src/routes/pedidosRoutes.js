// src/routes/pedidosRoutes.js
import { Router } from "express";
import {
  createPedidoHandler,
  getAllPedidosHandler,
  getPedidoByIdHandler,
  getPedidosByUsuarioHandler,
  updatePedidoHandler,
  updatePedidoEstadoHandler,
  deletePedidoHandler,
} from "../handlers/pedidosHandler.js";

const pedidosRoutes = Router();

/* 
 * GET
*/

// Listar pedidos (con filtros opcionales ?estado=&usuario=)
pedidosRoutes.get("/", getAllPedidosHandler);

// Obtener pedido por ID
pedidosRoutes.get("/:id", getPedidoByIdHandler);

// Obtener pedidos de un usuario
pedidosRoutes.get("/usuario/:usuarioId", getPedidosByUsuarioHandler);

/* 
 * POST
*/

// Crear pedido manualmente (además del checkout del carrito)
pedidosRoutes.post("/", createPedidoHandler);

/* 
 * PUT / PATCH
*/

// Actualizar datos del pedido
pedidosRoutes.put("/:id", updatePedidoHandler);

// Actualizar solo el estado del pedido
pedidosRoutes.patch("/:id/estado", updatePedidoEstadoHandler);

/* 
 * DELETE
*/

// Eliminar pedido
pedidosRoutes.delete("/:id", deletePedidoHandler);

export default pedidosRoutes;