import Joi from "joi";
import mongoose from "mongoose";

export const validateLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Debe ser un email válido",
    "any.required": "El email es obligatorio",
  }),
  contraseña: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
});
