import Joi from "joi";
import mongoose from "mongoose";

// Validación de ObjectId de Mongo con mensaje personalizado
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("El ID proporcionado no es válido.");
  }
  return value;
};

// Validación Joi para Pedido
export const validatePedido = Joi.object({
  usuario: Joi.string()
    .custom(objectIdValidator, "validación ObjectId")
    .required()
    .messages({
      "any.required": "El ID del usuario es obligatorio.",
      "string.empty": "El ID del usuario no puede estar vacío.",
    }),

  productos: Joi.array()
    .items(
      Joi.object({
        producto: Joi.string()
          .custom(objectIdValidator, "validación ObjectId")
          .required()
          .messages({
            "any.required": "El ID del producto es obligatorio.",
            "string.empty": "El ID del producto no puede estar vacío.",
          }),
        cantidad: Joi.number().integer().min(1).required().messages({
          "number.base": "La cantidad debe ser un número.",
          "number.integer": "La cantidad debe ser un número entero.",
          "number.min": "La cantidad debe ser al menos 1.",
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
      "array.base": "Los productos deben ser un arreglo.",
      "array.min": "Debe haber al menos un producto en el pedido.",
      "any.required": "Los productos son obligatorios.",
    }),

  total: Joi.number().min(0).required().messages({
    "number.base": "El total debe ser un número.",
    "number.min": "El total no puede ser negativo.",
    "any.required": "El total es obligatorio.",
  }),

  metodoPago: Joi.string()
    .custom(objectIdValidator, "validación ObjectId")
    .required()
    .messages({
      "any.required": "El método de pago es obligatorio.",
      "string.empty": "El ID del método de pago no puede estar vacío.",
    }),

  direccion: Joi.object({
    calle: Joi.string().trim().min(2).max(100).required().messages({
      "string.base": "La calle debe ser un texto.",
      "string.empty": "La calle es obligatoria.",
      "string.min": "La calle debe tener al menos 2 caracteres.",
      "string.max": "La calle no puede superar los 100 caracteres.",
      "any.required": "La calle es obligatoria.",
    }),
    numero: Joi.string().trim().min(1).max(10).required().messages({
      "string.base": "El número debe ser un texto.",
      "string.empty": "El número es obligatorio.",
      "string.min": "El número debe tener al menos 1 caracter.",
      "string.max": "El número no puede superar los 10 caracteres.",
      "any.required": "El número es obligatorio.",
    }),
    ciudad: Joi.string().trim().min(2).max(50).required().messages({
      "string.base": "La ciudad debe ser un texto.",
      "string.empty": "La ciudad es obligatoria.",
      "string.min": "La ciudad debe tener al menos 2 caracteres.",
      "string.max": "La ciudad no puede superar los 50 caracteres.",
      "any.required": "La ciudad es obligatoria.",
    }),
    provincia: Joi.string().trim().min(2).max(50).required().messages({
      "string.base": "La provincia debe ser un texto.",
      "string.empty": "La provincia es obligatoria.",
      "string.min": "La provincia debe tener al menos 2 caracteres.",
      "string.max": "La provincia no puede superar los 50 caracteres.",
      "any.required": "La provincia es obligatoria.",
    }),
    codigoPostal: Joi.string().trim().min(4).max(10).required().messages({
      "string.base": "El código postal debe ser un texto.",
      "string.empty": "El código postal es obligatorio.",
      "string.min": "El código postal debe tener al menos 4 caracteres.",
      "string.max": "El código postal no puede superar los 10 caracteres.",
      "any.required": "El código postal es obligatorio.",
    }),
    pais: Joi.string().trim().min(2).max(50).required().messages({
      "string.base": "El país debe ser un texto.",
      "string.empty": "El país es obligatorio.",
      "string.min": "El país debe tener al menos 2 caracteres.",
      "string.max": "El país no puede superar los 50 caracteres.",
      "any.required": "El país es obligatorio.",
    }),
  })
    .required()
    .messages({
      "any.required": "La dirección es obligatoria.",
      "object.base": "La dirección debe ser un objeto válido.",
    }),

  estado: Joi.string()
    .valid("pendiente", "pagado", "enviado", "entregado", "cancelado")
    .default("pendiente")
    .messages({
      "any.only":
        "El estado debe ser 'pendiente', 'pagado', 'enviado', 'entregado' o 'cancelado'.",
    }),
});
