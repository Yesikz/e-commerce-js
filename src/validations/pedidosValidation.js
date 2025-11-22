import Joi from "joi";
import mongoose from "mongoose";

// Validación de ObjectId de Mongo
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// Validación Joi para Pedido
export const validatePedido = Joi.object({
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
        cantidad: Joi.number().integer().min(1).required().messages({
          "number.base": "La cantidad debe ser un número.",
          "number.min": "La cantidad mínima es 1.",
          "any.required": "La cantidad es obligatoria.",
        }),
        precioUnitario: Joi.number().min(0).required().messages({
          "number.base": "El precio unitario debe ser un número.",
          "number.min": "El precio unitario no puede ser negativo.",
          "any.required": "El precio unitario es obligatorio.",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "El campo 'productos' debe ser un arreglo.",
      "array.min": "Debe haber al menos un producto en el pedido.",
      "any.required": "El campo 'productos' es obligatorio.",
    }),

  total: Joi.number().min(0).required().messages({
    "number.base": "El total debe ser un número.",
    "number.min": "El total no puede ser negativo.",
    "any.required": "El total es obligatorio.",
  }),

  metodoPago: objectId.required().messages({
    "any.required": "El método de pago es obligatorio.",
    "any.invalid": "El método de pago debe ser un ID válido de MongoDB.",
  }),

  estado: Joi.string()
    .valid("pendiente", "pagado", "enviado", "entregado", "cancelado")
    .default("pendiente")
    .messages({
      "any.only":
        "El estado debe ser 'pendiente', 'pagado', 'enviado', 'entregado' o 'cancelado'.",
    }),

  envio: objectId.allow(null).messages({
    "any.invalid": "El envío debe ser un ID válido de MongoDB.",
  }),
});
