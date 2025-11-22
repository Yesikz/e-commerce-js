import Joi from "joi";
import mongoose from "mongoose";

// Validación de ObjectId de Mongo
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// Validación Joi para Producto
export const validateProducto = Joi.object({
  nombre: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 2 caracteres.",
    "string.max": "El nombre no puede superar los 100 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),

  descripcion: Joi.string().trim().min(10).max(500).required().messages({
    "string.base": "La descripción debe ser un texto.",
    "string.empty": "La descripción es obligatoria.",
    "string.min": "La descripción debe tener al menos 10 caracteres.",
    "string.max": "La descripción no puede superar los 500 caracteres.",
    "any.required": "La descripción es obligatoria.",
  }),

  precio: Joi.number().min(0).required().messages({
    "number.base": "El precio debe ser un número.",
    "number.min": "El precio no puede ser negativo.",
    "any.required": "El precio es obligatorio.",
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número.",
    "number.min": "El stock no puede ser negativo.",
    "any.required": "El stock es obligatorio.",
  }),

  año: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .optional()
    .messages({
      "number.base": "El año debe ser un número.",
      "number.min": `El año no puede ser menor a 1900.`,
      "number.max": `El año no puede ser mayor al año actual.`,
    }),

  categoria: objectId.required().messages({
    "any.required": "La categoría es obligatoria.",
    "any.invalid": "La categoría debe ser un ID válido de MongoDB.",
  }),

  marca: objectId.required().messages({
    "any.required": "La marca es obligatoria.",
    "any.invalid": "La marca debe ser un ID válido de MongoDB.",
  }),

  imagenes: Joi.array()
    .items(
      Joi.string().uri().messages({
        "string.uri": "Cada imagen debe ser una URL válida.",
      })
    )
    .optional()
    .messages({
      "array.base": "El campo 'imagenes' debe ser un arreglo de URLs.",
    }),

  activo: Joi.boolean().optional().messages({
    "boolean.base": "El campo 'activo' debe ser verdadero o falso.",
  }),
});
