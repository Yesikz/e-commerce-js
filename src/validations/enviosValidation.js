import Joi from "joi";

// Validación Joi para Envío
export const validateEnvio = Joi.object({
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
  }).required().messages({
    "any.required": "La dirección es obligatoria.",
    "object.base": "La dirección debe ser un objeto válido.",
  }),

  costo: Joi.number().min(0).required().messages({
    "number.base": "El costo debe ser un número.",
    "number.min": "El costo no puede ser negativo.",
    "any.required": "El costo es obligatorio.",
  }),

  estado: Joi.string()
    .valid("preparando", "en camino", "entregado")
    .default("preparando")
    .messages({
      "any.only": "El estado debe ser 'preparando', 'en camino' o 'entregado'.",
    }),
});
