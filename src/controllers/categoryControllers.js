/* 
FALTAN AGREGAR
 getCategoryStatsController,
 getCategoryWithProductsController,

 Listos para el front
 - createCategoriaController
 - getAllCategoriesController
 - getCategoryStatsController 
 - getCategoryByNameController
 - getCategoryByIdController
 - getCategoryByStatusController
 - updateCategoryController
 - restoreCategoryController
 - deleteSoftCategoryController
 - 
*/

import Categoria from "../models/Categoria.js";

/* =======================================================
 * CREATE: Controlador de creación de categoría
 * =======================================================
 * Verifica si ya existe una categoría registrada con el mismo nombre
 * Si no existe, crea la nueva categoría en la base de datos.
 * Devuelve mensaje de confirmación y los datos creados.
 */
export const createCategoriaController = async (categoriaData) => {
  const { nombre, descripcion, activo = true } = categoriaData;

  // Validación: duplicados
  const categoryExist = await Categoria.findOne({ nombre });
  if (categoryExist) {
    const err = new Error("Categoría ya registrada");
    err.status = 409;
    throw err;
  }

  // Crear categoría
  const newCategory = await Categoria.create({
    nombre,
    descripcion,
    activo,
  });

  return {
    message: "Categoría agregada exitosamente",
    category: newCategory,
  };
};

/* =======================================================
 * LECTURA: Controlador de obtención de todas las categorías
 * =======================================================
 * - getAllCategoriesController: recupera todas las categorías registradas en la DB
 * - getCategoryByNameController: busca categorías que coincidan con un nombre específico
 * - getCategoryByIdController: obtiene una categoría según su ID
 *
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found)
 * - Devuelven un mensaje de éxito junto con los datos encontrados
 */

export const getAllCategoriesController = async () => {
  const categories = await Categoria.find();

  if (!categories.length) {
    const err = new Error("No hay categorías registradas");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Categorías encontradas",
    data: categories,
  };
};

export const getCategoryStatsController = async () => {
  const total = await Categoria.countDocuments();
  const active = await Categoria.countDocuments({ activo: true });
  const inactive = await Categoria.countDocuments({ activo: false });

  if (total === 0) {
    const err = new Error("No hay categorías registradas");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Estadísticas de categorías obtenidas correctamente",
    data: { total, active, inactive },
  };
};

export const getCategoryByNameController = async (nombre) => {
  const categoriesByName = await Categoria.find({ nombre });

  if (categoriesByName.length === 0) {
    const err = new Error(
      `No se encontró ninguna categoría con el nombre '${nombre}'`
    );
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Categoría encontrada",
    data: categoriesByName,
  };
};

export const getCategoryByIdController = async (id) => {
  const categoryById = await Categoria.findById(id);

  if (!categoryById) {
    const err = new Error(`No se encontró la categoría con el ID '${id}'`);
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Categoría encontrada",
    data: categoryById,
  };
};

export const getCategoryByStatusController = async (isActive) => {
  // Validación y conversión a boolean
  if (typeof isActive === "string") {
    if (isActive !== "true" && isActive !== "false") {
      const err = new Error(
        "El parámetro 'isActive' debe ser 'true' o 'false'"
      );
      err.status = 400;
      throw err;
    }
    isActive = isActive === "true";
  }

  // Filtrado
  const categories = await Categoria.find({ activo: isActive });

  return {
    success: true,
    message: categories.length
      ? `Categorías ${isActive ? "activas" : "inactivas"} encontradas`
      : `No se encontraron categorías ${isActive ? "activas" : "inactivas"}`,
    data: categories,
  };
};

/* =======================================================
 * UPDATE: Controlador de actualización de categoría
 * =======================================================
 * - Busca la categoría en la DB usando el ID proporcionado
 * - Si no se encuentra, lanza un error 404 indicando que no existe
 * - Devuelve un mensaje de éxito junto con la categoría actualizada.
 */

export const updateCategoryController = async (id, categoryData) => {
  const { nombre, descripcion, activo } = categoryData;

  // Validación: existencia por id
  const categoryById = await Categoria.findById(id);
  if (!categoryById) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Actualización en la DB
  const categoryUpdate = await Categoria.findByIdAndUpdate(
    id,
    { nombre, descripcion, activo },
    { new: true, runValidators: true }
  );

  return {
    success: true,
    message: "Categoría actualizada",
    data: categoryUpdate,
  };
};

export const restoreCategoryController = async (id) => {
  // Buscar categoría por ID
  const category = await Categoria.findById(id);
  if (!category) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Verificar si ya está activa
  if (category.activo) {
    const err = new Error("La categoría ya está activa");
    err.status = 400;
    throw err;
  }

  // Restaurar categoría
  category.activo = true;
  await category.save();

  return {
    success: true,
    message: "Categoría restaurada exitosamente",
    data: category,
  };
};

/* =======================================================
 * DELETE: Controlador de eliminación de categoría
 * =======================================================
 * - Busca la categoría en la DB usando el ID proporcionado
 * - Si no se encuentra, lanza un error 404 indicando que no existe.
 * - Eliminacion permanente la categoría de la DB.
 * - Devuelve un mensaje de éxito junto con los datos de la categoría eliminada.
 */
export const deleteSoftCategoryController = async (id) => {
  // Buscar categoría por ID
  const category = await Categoria.findById(id);
  if (!category) {
    const err = new Error(`Categoría con ID '${id}' no encontrada`);
    err.status = 404;
    throw err;
  }

  // Verificar si ya está inactiva
  if (!category.activo) {
    const err = new Error(`La categoría con ID '${id}' ya está inactiva`);
    err.status = 400;
    throw err;
  }

  // Soft delete
  category.activo = false;
  await category.save();

  return {
    success: true,
    message: `Categoría con ID '${id}' desactivada (soft delete)`,
    data: category,
  };
};

export const deleteCategoryController = async (id) => {
  // Buscar categoría por ID
  const categoryDelete = await Categoria.findById(id);

  if (!categoryDelete) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Eliminación permanente
  await Categoria.findByIdAndDelete(id);

  return {
    success: true,
    message: "Categoría eliminada",
    data: categoryDelete,
  };
};
