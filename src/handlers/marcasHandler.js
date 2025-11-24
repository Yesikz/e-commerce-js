import {
  createMarcaController,
  deleteMarcaController,
  getAllMarcasController,
  getMarcaByIdController,
  updateMarcaController
} from "../controllers/marcasControllers.js";
import { validate } from "../validations/validators.js";

//crea una marca
export const createMarcasHandler = async (req, res, next) => {
  try {
    // Validación de datos
    const validatedData = validate("marca", req.body);

    const response = await createMarcaController(validatedData);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

//trae todas las marcas de la base de datos
export const getAllMarcasHandler = async (req, res, next) => {
  try {
    const response = await getAllMarcasController();

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

//trae todos los productos por id
export const getMarcaByIdHandler = async (req, res, next) => {
  try {
    const response = await getMarcaByIdController(req.params.id);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

//Actualizar marca
export const updateMarcaHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const marcaData = req.body;

    const response = await updateMarcaController(id, marcaData);

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};


/* --- Elimina --- */
export const deleteMarcaHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await deleteMarcaController(id);
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
