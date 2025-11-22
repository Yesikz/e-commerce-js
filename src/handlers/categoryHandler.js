import {
  createCategoriaController,
  /* Get */
  getAllCategoriesController,
  getCategoryStatsController,
  getCategoryByNameController,
  getCategoryByIdController,
  getCategoryByStatusController,
  /* Update */
  updateCategoryController,
  restoreCategoryController,
  /* Delete */
  deleteSoftCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";

import { validateCategoria } from "../validations/categoriaValidation.js";

/* --- Create --- */
export const createCategoriaHandler = async (req, res, next) => {
  try {
    // Validación con Joi
    const { error } = validateCategoria.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 409;
      err.name = "Validation";
      throw err;
    }

    const { nombre, descripcion } = req.body;

    // Lógica de creación
    const response = await createCategoriaController({
      nombre,
      descripcion,
    });

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.category,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
};

/* --- Read --- */
export const getAllCategoriesHandler = async (req, res, next) => {
  try {
    const response = await getAllCategoriesController();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const getAllCategoryStatsHandler = async (req, res, next) => {
  try {
    const response = await getCategoryStatsController();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const getCategoryByNameHandler = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      const err = new Error("El parámetro 'nombre' es obligatorio");
      err.status = 400;
      throw err;
    }

    const response = await getCategoryByNameController(nombre);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const getCategoryByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getCategoryByIdController(id);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

/* --- Estado --- */
export const getCategoryByStatusHandler = async (req, res, next) => {
  try {
    const { isActive } = req.query;
    const response = await getCategoryByStatusController(isActive);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

/* --- Update --- */
export const updateCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const response = await updateCategoryController(id, {
      nombre,
      descripcion,
    });

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const restoreCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await restoreCategoryController(id);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

/* --- Delete --- */
export const deleteSoftCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteSoftCategoryController(id);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const deleteCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteCategoryController(id);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error interno del servidor",
    });
  }
};
