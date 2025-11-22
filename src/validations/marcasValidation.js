import Joi from "joi";

// Validación Joi para Marca
export const validateMarca = Joi.object({
  nombre: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 2 caracteres.",
    "string.max": "El nombre no puede superar los 50 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),

  paisOrigen: Joi.string().trim().min(2).max(50).allow("").messages({
    "string.base": "El país de origen debe ser un texto.",
    "string.min": "El país de origen debe tener al menos 2 caracteres.",
    "string.max": "El país de origen no puede superar los 50 caracteres.",
  }),
});
