import Joi from "joi";

// Validación Joi para Categoria
export const validateCategoria = Joi.object({
  nombre: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 2 caracteres.",
    "string.max": "El nombre no puede superar los 50 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),

  descripcion: Joi.string().trim().max(200).allow("").messages({
    "string.base": "La descripción debe ser un texto.",
    "string.max": "La descripción no puede superar los 200 caracteres.",
  }),
});
