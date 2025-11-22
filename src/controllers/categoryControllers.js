import Categoria from "../models/Categoria.js";

/* =======================================================
 * CREATE: Controlador de creación de categoría
 * =======================================================
 * Verifica si ya existe una categoría registrada con el mismo nombre
 * Si no existe, crea la nueva categoría en la base de datos.
 * Devuelve mensaje de confirmación y los datos creados.
 */
export const createCategoriaController = async (categoriaData) => {
  const { nombre, descripcion } = categoriaData;

  // Buscar si ya existe una categoría con ese nombre
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
    message: "Categorías encontradas",
    categories,
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
    message: "Categoría encontrada",
    categories: categoriesByName,
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
    message: "Categoría encontrada",
    category: categoryById,
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
  const { nombre, descripcion } = categoryData;

  // Validación: existencia por id
  const categoryById = await Categoria.findById(id);
  if (!categoryById) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Actualización en la DB y obtener el documento actualizado
  const categoryUpdate = await Categoria.findByIdAndUpdate(
    id,
    { nombre, descripcion },
    { new: true, runValidators: true } // runValidators asegura que Joi/Mongoose schema se cumpla
  );

  return {
    message: "Categoría actualizada",
    category: categoryUpdate,
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
    message: "Categoría eliminada",
    category: categoryDelete,
  };
};
