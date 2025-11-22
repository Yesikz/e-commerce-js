import Joi from "joi";
import mongoose from "mongoose";

// Validación de ObjectId de Mongo
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// Schema de validación Joi para Carrito
export const validateCarrito = Joi.object({
  usuario: objectId.required().messages({
    "any.required": "El campo 'usuario' es obligatorio.",
    "any.invalid": "El 'usuario' debe ser un ID válido de MongoDB.",
  }),

  productos: Joi.array()
    .items(
      Joi.object({
        producto: objectId.required().messages({
          "any.required": "El campo 'producto' es obligatorio.",
          "any.invalid": "El 'producto' debe ser un ID válido de MongoDB.",
        }),
        cantidad: Joi.number().integer().min(1).default(1).messages({
          "number.base": "La cantidad debe ser un número.",
          "number.min": "La cantidad mínima es 1.",
        }),
      })
    )
    .messages({
      "array.base": "El campo 'productos' debe ser un arreglo.",
    }),
});
