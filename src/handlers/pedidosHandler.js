// src/handlers/pedidosHandler.js
import {
  createPedidoController,
  getAllPedidosController,
  getPedidoByIdController,
  getPedidosByUsuarioController,
  updatePedidoController,
  updatePedidoEstadoController,
  deletePedidoController,
} from "../controllers/pedidosControllers.js";

import { validate } from "../validations/validators.js";

/* 
 * CREATE
*/
export const createPedidoHandler = async (req, res, next) => {
  try {
    const validatedData = validate("pedido", req.body);

    const response = await createPedidoController(validatedData);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* 
 * GET
*/

// GET /pedidos?estado=...&usuario=...
export const getAllPedidosHandler = async (req, res, next) => {
  try {
    const { estado, usuario } = req.query;

    const response = await getAllPedidosController({ estado, usuario });

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// GET /pedidos/:id
export const getPedidoByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await getPedidoByIdController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// GET /pedidos/usuario/:usuarioId
export const getPedidosByUsuarioHandler = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const response = await getPedidosByUsuarioController(usuarioId);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* 
 * UPDATE
*/

// PUT /pedidos/:id
export const updatePedidoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedidoData = req.body;

    const response = await updatePedidoController(id, pedidoData);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /pedidos/:id/estado
export const updatePedidoEstadoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const response = await updatePedidoEstadoController(id, estado);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

/* 
 * DELETE
*/

// DELETE /pedidos/:id
export const deletePedidoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deletePedidoController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};