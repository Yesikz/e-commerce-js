import Joi from "joi";

// Validación Joi para Usuario
export const validateUsuario = Joi.object({
  nombre: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 2 caracteres.",
    "string.max": "El nombre no puede superar los 50 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),

  nombreUsuario: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "El nombre de usuario debe ser un texto.",
      "string.empty": "El nombre de usuario es obligatorio.",
      "string.alphanum":
        "El nombre de usuario solo puede contener letras y números.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede superar los 30 caracteres.",
      "any.required": "El nombre de usuario es obligatorio.",
    }),

  email: Joi.string().trim().email().required().messages({
    "string.base": "El email debe ser un texto.",
    "string.email": "El email debe ser válido.",
    "string.empty": "El email es obligatorio.",
    "any.required": "El email es obligatorio.",
  }),

  contraseña: Joi.string().min(6).max(100).required().messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 6 caracteres.",
    "string.max": "La contraseña no puede superar los 100 caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),

  telefono: Joi.string()
    .pattern(/^[0-9+\-()\s]*$/)
    .allow("")
    .messages({
      "string.pattern.base":
        "El teléfono solo puede contener números y caracteres válidos (+, -, (), espacios).",
    }),

  activo: Joi.boolean().optional().messages({
    "boolean.base": "El campo 'activo' debe ser verdadero o falso.",
  }),

  rol: Joi.string().valid("admin", "cliente").default("cliente").messages({
    "any.only": "El rol debe ser 'admin' o 'cliente'.",
  }),

  direccion: Joi.array()
    .items(
      Joi.object({
        calle: Joi.string().trim().min(2).max(100).required().messages({
          "string.base": "La calle debe ser un texto.",
          "string.empty": "La calle es obligatoria.",
          "string.min": "La calle debe tener al menos 2 caracteres.",
          "string.max": "La calle no puede superar los 100 caracteres.",
        }),
        numero: Joi.string().trim().min(1).max(10).required().messages({
          "string.base": "El número debe ser un texto.",
          "string.empty": "El número es obligatorio.",
          "string.min": "El número debe tener al menos 1 caracter.",
          "string.max": "El número no puede superar los 10 caracteres.",
        }),
        ciudad: Joi.string().trim().min(2).max(50).required().messages({
          "string.base": "La ciudad debe ser un texto.",
          "string.empty": "La ciudad es obligatoria.",
          "string.min": "La ciudad debe tener al menos 2 caracteres.",
          "string.max": "La ciudad no puede superar los 50 caracteres.",
        }),
        provincia: Joi.string().trim().min(2).max(50).required().messages({
          "string.base": "La provincia debe ser un texto.",
          "string.empty": "La provincia es obligatoria.",
          "string.min": "La provincia debe tener al menos 2 caracteres.",
          "string.max": "La provincia no puede superar los 50 caracteres.",
        }),
        codigoPostal: Joi.string().trim().min(4).max(10).required().messages({
          "string.base": "El código postal debe ser un texto.",
          "string.empty": "El código postal es obligatorio.",
          "string.min": "El código postal debe tener al menos 4 caracteres.",
          "string.max": "El código postal no puede superar los 10 caracteres.",
        }),
        pais: Joi.string().trim().min(2).max(50).required().messages({
          "string.base": "El país debe ser un texto.",
          "string.empty": "El país es obligatorio.",
          "string.min": "El país debe tener al menos 2 caracteres.",
          "string.max": "El país no puede superar los 50 caracteres.",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "El campo 'direccion' debe ser un arreglo de direcciones.",
    }),
});
