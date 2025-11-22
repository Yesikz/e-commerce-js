import {
  createCategoriaController,
  getAllCategoriesController,
  getCategoryByNameController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryControllers.js";

import { validateCategoria } from "../validations/categoriaValidation.js";

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

    // Delegación al controller (solo lógica DB)
    const response = await createCategoriaController({
      nombre,
      descripcion,
    });

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllCategoriesHandler = async (req, res, next) => {
  try {
    const response = await getAllCategoriesController();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
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
    next(err);
  }
};

export const getCategoryByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getCategoryByIdController(id);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

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
    next(err);
  }
};

export const deleteCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteCategoryController(id);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
