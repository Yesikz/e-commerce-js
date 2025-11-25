// src/handlers/enviosHandler.js
import {
  createEnvioController,
  getAllEnviosController,
  getEnvioByIdController,
  getEnviosByPedidoController,
  updateEnvioController,
  updateEnvioEstadoController,
  deleteEnvioController,
} from "../controllers/enviosControllers.js";

import { validate } from "../validations/validators.js";

/*
 * CREATE
*/

// POST /envios
export const createEnvioHandler = async (req, res, next) => {
  try {
    const validatedData = validate("envio", req.body);

    const response = await createEnvioController(validatedData);

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

// GET /envios?estado=...&pedido=...
export const getAllEnviosHandler = async (req, res, next) => {
  try {
    const { estado, pedido } = req.query;

    const response = await getAllEnviosController({ estado, pedido });

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// GET /envios/:id
export const getEnvioByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await getEnvioByIdController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// GET /envios/pedido/:pedidoId
export const getEnviosByPedidoHandler = async (req, res, next) => {
  try {
    const { pedidoId } = req.params;

    const response = await getEnviosByPedidoController(pedidoId);

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

// PUT /envios/:id
export const updateEnvioHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const envioData = req.body;

    const response = await updateEnvioController(id, envioData);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /envios/:id/estado
export const updateEnvioEstadoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const response = await updateEnvioEstadoController(id, estado);

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

// DELETE /envios/:id
export const deleteEnvioHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteEnvioController(id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};