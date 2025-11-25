// src/controllers/enviosControllers.js
import Envio from "../models/Envios.js";
import Pedido from "../models/Pedidos.js";

/* 
 * Crear envío para un pedido
*/
export const createEnvioController = async (envioData) => {
  const { pedido: pedidoId } = envioData;

  // Verificar que el pedido exista
  const pedido = await Pedido.findById(pedidoId);

  if (!pedido) {
    const err = new Error(`Pedido con ID '${pedidoId}' no encontrado`);
    err.status = 404;
    throw err;
  }

  // Evitar duplicar envíos para el mismo pedido
  const envioExistente = await Envio.findOne({ pedido: pedidoId });
  if (envioExistente) {
    const err = new Error(
      `Ya existe un envío asociado al pedido con ID '${pedidoId}'`
    );
    err.status = 409;
    throw err;
  }

  const envio = await Envio.create(envioData);

  return {
    success: true,
    message: "Envío creado correctamente",
    data: envio,
  };
};

/* 
 * Listar envíos (con filtros opcionales)
*/
export const getAllEnviosController = async (filters = {}) => {
  const query = {};

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.pedido) {
    query.pedido = filters.pedido;
  }

  const envios = await Envio.find(query)
    .populate({
      path: "pedido",
      populate: [
        { path: "usuario", select: "nombre nombreUsuario email" },
        { path: "productos.producto", select: "nombre precio" },
      ],
    })
    .sort({ createdAt: -1 });

  return {
    success: true,
    message: "Listado de envíos obtenido correctamente",
    data: envios,
  };
};

/* 
 * Obtener envío por ID
*/
export const getEnvioByIdController = async (id) => {
  const envio = await Envio.findById(id).populate({
    path: "pedido",
    populate: [
      { path: "usuario", select: "nombre nombreUsuario email" },
      { path: "productos.producto", select: "nombre precio" },
    ],
  });

  if (!envio) {
    const err = new Error(`Envío con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Envío encontrado",
    data: envio,
  };
};

/* 
 * Obtener envíos por ID de pedido
*/
export const getEnviosByPedidoController = async (pedidoId) => {
  const envios = await Envio.find({ pedido: pedidoId }).populate({
    path: "pedido",
    populate: [
      { path: "usuario", select: "nombre nombreUsuario email" },
      { path: "productos.producto", select: "nombre precio" },
    ],
  });

  return {
    success: true,
    message: "Envíos asociados al pedido obtenidos correctamente",
    data: envios,
  };
};

/* 
 * Actualizar envío completo
*/
export const updateEnvioController = async (id, envioData) => {
  const envio = await Envio.findByIdAndUpdate(id, envioData, {
    new: true,
  }).populate({
    path: "pedido",
    populate: [
      { path: "usuario", select: "nombre nombreUsuario email" },
      { path: "productos.producto", select: "nombre precio" },
    ],
  });

  if (!envio) {
    const err = new Error(`Envío con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Envío actualizado correctamente",
    data: envio,
  };
};

/* 
 * Actualizar solo el estado del envío
*/
export const updateEnvioEstadoController = async (id, estado) => {
  const envio = await Envio.findByIdAndUpdate(
    id,
    { estado },
    { new: true }
  ).populate({
    path: "pedido",
    populate: [
      { path: "usuario", select: "nombre nombreUsuario email" },
      { path: "productos.producto", select: "nombre precio" },
    ],
  });

  if (!envio) {
    const err = new Error(`Envío con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: `Estado del envío actualizado a '${estado}'`,
    data: envio,
  };
};

/* 
 * Eliminar envío 
*/
export const deleteEnvioController = async (id) => {
  const envio = await Envio.findById(id);

  if (!envio) {
    const err = new Error(`Envío con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  const eliminado = await Envio.findByIdAndDelete(id);

  return {
    success: true,
    message: `Envío con ID '${id}' eliminado correctamente`,
    data: eliminado,
  };
};