import { validateUsuario } from "../validations/usuariosValidation.js";
import { validateProducto } from "../validations/productosValidation.js";
import { validateCategoria } from "../validations/categoriaValidation.js";
import { validateCarrito } from "../validations/carritoValidation.js";
import { validateLogin } from "../validations/authValidation.js";

const schemas = {
  usuario: validateUsuario,
  producto: validateProducto,
  categoria: validateCategoria,
  carrito: validateCarrito,
  login: validateLogin,
};

export const validate = (model, data) => {
  const schema = schemas[model];
  if (!schema) {
    const err = new Error(`No existe esquema de validación para: ${model}`);
    err.status = 500;
    throw err;
  }

  const { error, value } = schema.validate(data, {
    stripUnknown: true,
  });

  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 409;
    err.name = "ValidationError";
    throw err;
  }

  return value;
};
