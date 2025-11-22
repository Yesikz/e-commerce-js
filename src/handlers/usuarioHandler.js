import { createUserController } from "../controllers/usuarioController.js";
import { validate } from "../validations/validators.js";

/* --- Crear --- */
export const createUserHandler = async (req, res, next) => {
  try {
    const validatedData = validate("usuario", req.body);
    const response = await createUserController(validatedData);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
