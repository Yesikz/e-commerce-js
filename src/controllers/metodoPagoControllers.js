// controllers/metodoPagoController.js
import MetodoPago from "../models/MetodoPago.js";
import mongoose from "mongoose";

export const createMetodoPagoController = async (metodoPagoData) => {
  const { nombre } = metodoPagoData;

  // Verificar si ya existe
  const metodoExist = await MetodoPago.findOne({ nombre });
  if (metodoExist) {
    const err = new Error("Método de pago ya agregado");
    err.status = 409;
    throw err;
  }

  // Crear método
  const newMetodo = new MetodoPago({ nombre });
  await newMetodo.save();

  return {
    success: true,
    message: "Método de pago agregado exitosamente",
    data: newMetodo,
  };
};

/* trae todos los metodos de pago de la base de datos */
export const getAllMetodoPagoController = async () => {
  const metodos = await MetodoPago.find();

  if (!metodos.length) {
    const err = new Error("No hay metodos de pago disponibles");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Métodos de pago obtenidos correctamente",
    data: metodos,
  };
};

/* trae los Metodo de pago por id */
export const getMetodoPagoByIdController = async (id) => {
  const metodos = await MetodoPago.findById(id);

  if (!metodos) {
    throw new Error("No se encontró el metodos de pago ");
  }

  return {
    success: true,
    message: "Métodos de pago encontrado",
    data: metodos,
  };
};

export const getMetodoPagoByNameController = async (nombre) => {
  if (!nombre) {
    const err = new Error("Debe enviar el parámetro 'nombre'");
    err.status = 400;
    throw err;
  }

  const metodos = await MetodoPago.findOne({
    nombre: { $regex: `^${nombre}$`, $options: "i" },
    activo: true,
  });

  if (!metodos) {
    const err = new Error(
      `No se encontró el método de pago con nombre '${nombre}'`
    );
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Método de pago encontrado",
    data: metodos,
  };
};

/* Actualizar Metodo de Pago */
export const updateMetodoPagoController = async (id, metodoData) => {
  // Validar ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de método de pago no válido");
    err.status = 400;
    throw err;
  }

  // Buscar método de pago por ID
  const metodo = await MetodoPago.findById(id);
  if (!metodo) {
    const err = new Error("Método de pago no encontrado");
    err.status = 404;
    throw err;
  }

  // Preparar campos permitidos a actualizar
  const updatedFields = {};

  // Solo permite actualizar "nombre"
  if (metodoData.nombre) {
    // Verificar si ya existe otro método con ese nombre
    const exists = await MetodoPago.findOne({ nombre: metodoData.nombre });

    if (exists && exists._id.toString() !== id) {
      const err = new Error("Ya existe un método de pago con ese nombre");
      err.status = 409;
      throw err;
    }

    updatedFields.nombre = metodoData.nombre;
  }

  if (metodoData.activo !== undefined) {
    updatedFields.activo = metodoData.activo;
  }

  // Actualizar
  const updatedMetodo = await MetodoPago.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });

  return {
    success: true,
    message: "Método de pago actualizado",
    data: updatedMetodo,
  };
};

/*Restore Metodo de Pago */
export const restoreMetodoPagoController = async (id) => {
  // Buscar método de pago por ID
  const metodo = await MetodoPago.findById(id);
  if (!metodo) {
    const err = new Error("Método de pago no encontrado");
    err.status = 404;
    throw err;
  }

  // Verificar si ya está activo
  if (metodo.activo) {
    const err = new Error("El método de pago ya está activo");
    err.status = 400;
    throw err;
  }

  // Restaurar método de pago
  metodo.activo = true;
  await metodo.save();

  return {
    success: true,
    message: "Método de pago restaurado exitosamente",
    data: metodo,
  };
};

/* Eliminacion Permanente */
export const deleteMetodoPagoController = async (id) => {
  // Validación: ID válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de de metod de pago no válido");
    err.status = 400;
    throw err;
  }

  // Buscar usuario por ID
  const metodo = await MetodoPago.findById(id);
  if (!metodo) {
    const err = new Error(`Metodo de pago con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  // Eliminación permanente
  await MetodoPago.findByIdAndDelete(id);

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: `Metodo de pago con ID '${id}' eliminado exitosamente`,
    data: metodo,
  };
};

/* Eliminacion Logica */
export const deleteSoftMetodoPagoController = async (id) => {
  // Validar ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID de método de pago no válido");
    err.status = 400;
    throw err;
  }

  // Buscar método de pago
  const metodo = await MetodoPago.findById(id);
  if (!metodo) {
    const err = new Error(`Método de pago con ID '${id}' no encontrado`);
    err.status = 404;
    throw err;
  }

  // Verificar si ya está inactivo
  if (!metodo.activo) {
    const err = new Error(`El método de pago con ID '${id}' ya fue eliminado`);
    err.status = 400;
    throw err;
  }

  // Soft delete
  metodo.activo = false;
  await metodo.save();

  /* ===== Respuesta ===== */
  return {
    success: true,
    message: `Método de pago con ID '${id}' eliminado (soft delete)`,
    data: metodo,
  };
};
