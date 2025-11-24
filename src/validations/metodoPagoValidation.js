import Joi from "joi";

// Validación Joi para MetodoPago
export const validateMetodoPago = Joi.object({
  nombre: Joi.string()
    .valid("tarjeta", "transferencia", "mercadopago")
    .required()
    .messages({
      "any.only":
        "El método de pago debe ser 'tarjeta', 'transferencia' o 'mercadopago'.",
      "any.required": "El nombre del método de pago es obligatorio.",
      "string.empty": "El nombre del método de pago no puede estar vacío.",
    }),

  activo: Joi.boolean().optional().messages({
    "boolean.base": "El campo 'activo' debe ser verdadero o falso.",
  }),
});
