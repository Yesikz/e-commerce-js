import Marca from "../models/Marcas.js";

export const createMarcaController = async (marcasData) => {
  const { nombre, paisOrigen } = marcasData;

  // Validación: verificar si la marca ya existe [nombre]
  const marcaExist = await Marca.findOne({ nombre });
  if (marcaExist) {
    const err = new Error("Marca ya agregada");
    err.status = 409;
    throw err;
  }

  // Creación de la marca
  const newMarca = new Marca({
    nombre,
    paisOrigen,
  });

  await newMarca.save();

  return {
    success: true,
    message: "Marca agregada exitosamente",
    data: newMarca,
  };
};

/* trae todas las marcas de la base de datos */
export const getAllMarcasController = async () => {
  const marcas = await Marca.find();

  if (!marcas.length) {
    const err = new Error("No hay marcas disponibles");
    err.status = 404;
    throw err;
  }

  return {
    success: true,
    message: "Marcas encontradas",
    data: marcas,
  };
};

/* trae las marcas por id */
export const getMarcaByIdController = async (_id) => {
  const marca = await Marca.findById(_id);

  if (!marca) {
    throw new Error("No se encontró la marca");
  }

  return {
    success: true,
    message: "Marca encontrada",
    data: marca,
  };
};

/* actualiza una marca */
export const updateMarcaController = async (id, marcaData) => {
  const { nombre, paisOrigen } = marcaData;

  const newMarca = {nombre, paisOrigen};

  const marca = await Marca.findByIdAndUpdate(id, newMarca, {
    new: true,
  });
  if (marca !== -1) {
    Object.assign(marca, newMarca);
  }
  return marca;
};

//Eliminar marca
export const deleteMarcaController = async (id) => {
  const marca = await Marca.findById(id);
  if (!marca) {
    const err = new Error(`Marca con ID '${id}' no encontrada`);
    err.status = 404;
    throw err;
  }

  const marcaDeleted = await Marca.findByIdAndDelete(id);

  return {
    success: true,
    message: `Marca con ID '${id}' eliminado exitosamente`,
    data: marcaDeleted,
  };
};
