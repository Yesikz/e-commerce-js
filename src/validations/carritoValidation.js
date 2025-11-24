import Joi from "joi";
import mongoose from "mongoose";

// Validación de ObjectId de Mongo con mensaje personalizado
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("El ID proporcionado no es válido.");
  }
  return value;
};

// Validación Joi para Carrito
export const validateCarrito = Joi.object({
  usuario: Joi.string().custom(objectIdValidator, "validación ObjectId").required().messages({
    "any.required": "El ID del usuario es obligatorio.",
    "string.empty": "El ID del usuario no puede estar vacío.",
  }),

  productos: Joi.array()
    .items(
      Joi.object({
        producto: Joi.string().custom(objectIdValidator, "validación ObjectId").required().messages({
          "any.required": "El ID del producto es obligatorio.",
          "string.empty": "El ID del producto no puede estar vacío.",
        }),
        cantidad: Joi.number().integer().min(1).required().messages({
          "number.base": "La cantidad debe ser un número.",
          "number.integer": "La cantidad debe ser un número entero.",
          "number.min": "La cantidad debe ser al menos 1.",
          "any.required": "La cantidad es obligatoria.",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los productos deben ser un arreglo.",
      "array.min": "Debe haber al menos un producto en el carrito.",
      "any.required": "Los productos son obligatorios.",
    }),

  total: Joi.number().min(0).default(0).messages({
    "number.base": "El total debe ser un número.",
    "number.min": "El total no puede ser negativo.",
  }),

  estado: Joi.string()
    .valid("activo", "finalizado")
    .default("activo")
    .messages({
      "any.only": "El estado debe ser 'activo' o 'finalizado'.",
    }),
});
