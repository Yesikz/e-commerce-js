// src/controllers/pedidosControllers.js
import Pedido from "../models/Pedidos.js";


// Crear pedido (manual)

export const createPedidoController = async (pedidoData) => {
  const pedido = await Pedido.create(pedidoData);

  return {
    success: true,
    message: "Pedido creado correctamente",
    data: pedido,
  };
};

/* 
 * Obtener todos los pedidos
 *  - Opcional: filtrar por estado / usuario
 */
export const getAllPedidosController = async (filters = {}) => {
  const query = {};

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.usuario) {
    query.usuario = filters.usuario;
  }

  const pedidos = await Pedido.find(query)
    .populate("usuario", "nombre nombreUsuario email")
    .populate("productos.producto", "nombre precio");

  return {
    success: true,
    message: "Listado de pedidos obtenido correctamente",
    data: pedidos,
  };
};

/* 
 * Obtener pedido por ID
 */
export const getPedidoByIdController = async (id) => {
  const pedido = await Pedido.findById(id)
    .populate("usuario", "nombre nombreUsuario email")
    .populate("productos.producto", "nombre precio");

  if (!pedido) {
    const err = new Error(`Pedido con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Pedido encontrado",
    data: pedido,
  };
};

/*
 * Obtener pedidos por usuario
*/
export const getPedidosByUsuarioController = async (usuarioId) => {
  const pedidos = await Pedido.find({ usuario: usuarioId })
    .populate("usuario", "nombre nombreUsuario email")
    .populate("productos.producto", "nombre precio")
    .sort({ createdAt: -1 });

  return {
    success: true,
    message: "Pedidos del usuario obtenidos correctamente",
    data: pedidos,
  };
};

/*
 * Actualizar datos de un pedido
 * (dirección, productos, total, estado, etc.)
 */
export const updatePedidoController = async (id, pedidoData) => {
  const pedido = await Pedido.findByIdAndUpdate(id, pedidoData, {
    new: true,
  })
    .populate("usuario", "nombre nombreUsuario email")
    .populate("productos.producto", "nombre precio");

  if (!pedido) {
    const err = new Error(`Pedido con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Pedido actualizado correctamente",
    data: pedido,
  };
};

/*
 * Actualizar solo el estado del pedido
*/
export const updatePedidoEstadoController = async (id, estado) => {
  const pedido = await Pedido.findByIdAndUpdate(
    id,
    { estado },
    { new: true }
  )
    .populate("usuario", "nombre nombreUsuario email")
    .populate("productos.producto", "nombre precio");

  if (!pedido) {
    const err = new Error(`Pedido con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: `stado del pedido actualizado a '${estado}'`,
    data: pedido,
  };
};

/*
 * Eliminar pedido
*/
export const deletePedidoController = async (id) => {
  const pedido = await Pedido.findById(id);

  if (!pedido) {
    const err = new Error(`Pedido con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  const eliminado = await Pedido.findByIdAndDelete(id);

  return {
    success: true,
    message: `Pedido con ID '${id}' eliminado correctamente`,
    data: eliminado,
  };
};