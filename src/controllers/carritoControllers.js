import Usuario from "../models/Usuarios.js";
import Producto from "../models/Productos.js";
import Carrito from "../models/Carrito.js";
import Pedido from "../models/Pedidos.js";

export const createCartController = async (usuarioId) => {
  // Verificar si el usuario ya tiene un carrito activo
  const carritoExistente = await Carrito.findOne({
    usuario: usuarioId,
    estado: "activo",
  });

  if (carritoExistente) {
    throw new Error("El usuario ya tiene un carrito activo");
  }

  // Crear un nuevo carrito
  const nuevoCarrito = await Carrito.create({
    usuario: usuarioId,
    productos: [],
    total: 0,
    estado: "activo",
  });

  return nuevoCarrito;
};

// Obtiene el carrito activo de un usuario (si existe).
export const getActiveCartController = async (usuarioId) => {
  // Validamos que se reciba un usuarioId
  if (!usuarioId) {
    throw {
      statusCode: 400,
      message: "Debe proporcionar un usuarioId válido.",
    };
  }

  // Buscamos el carrito activo del usuario
  const carrito = await Carrito.findOne({
    usuario: usuarioId,
    estado: "activo",
  })
    .populate("productos.producto") // informacion del pducto
    .populate("usuario", "nombre email"); // Traer dataos del usuario

  // Si el usuario no tiene un carrito activo
  if (!carrito) {
    return {
      message: "El usuario no tiene un carrito activo.",
      data: null,
    };
  }

  return {
    message: "Carrito activo encontrado.",
    data: carrito,
  };
};

// Obtiene un carrito por su ID
export const getCartByIdController = async (cartId) => {
  // Validar que se reciba el ID
  if (!cartId) {
    throw {
      statusCode: 400,
      message: "Debe proporcionar un cartId válido.",
    };
  }

  // Buscar el carrito por ID
  const carrito = await Carrito.findById(cartId)
    .populate("productos.producto") // información completa del producto
    .populate("usuario", "nombre email"); // datos básicos del usuario

  // Si no existe
  if (!carrito) {
    return {
      message: "No se encontró un carrito con ese ID.",
      data: null,
    };
  }

  return {
    message: "Carrito obtenido correctamente.",
    data: carrito,
  };
};

// Obtiene todos los carritos (activos o finalizados) de un usuario
export const getCartsByUserController = async (usuarioId, estado = null) => {
  try {
    const query = { usuario: usuarioId };

    // Si viene un estado válido, lo agregamos al query
    if (estado && ["activo", "finalizado"].includes(estado)) {
      query.estado = estado;
    }

    const carts = await Carrito.find(query)
      .populate("usuario")
      .populate("productos.producto");

    // Si no hay carritos
    if (!carts.length) {
      return {
        message: "No se encontraron carritos para este usuario",
        data: [],
      };
    }

    return {
      message: "Carritos obtenidos correctamente",
      data: carts,
    };
  } catch (error) {
    throw new Error(
      "Error al obtener los carritos del usuario: " + error.message
    );
  }
};

// Obtiene todos los carritos
export const getAllCartsController = async () => {
  // Obtener todos los carritos
  const carts = await Carrito.find()
    .populate("usuario", "nombre email") // traer datos clave del usuario
    .populate("productos.producto"); // traer info de los productos

  // Validar si no hay registros
  if (!carts.length) {
    const err = new Error("No hay carritos registrados");
    err.status = 404;
    throw err;
  }

  return {
    message: "Carritos obtenidos correctamente",
    data: carts,
  };
};

// Función para calcular el total del carrito
const calcularTotalCarrito = async (items) => {
  let total = 0;

  const productos = await Promise.all(
    items.map(async (item) => {
      const prod = await Producto.findById(item.producto);
      return prod ? prod.precio * item.cantidad : 0;
    })
  );

  productos.forEach((subTotal) => (total += subTotal));

  return total;
};

// Agregar un producto al carrito o aumentar la cantidad si ya existe
export const addProductToCartController = async (
  cartId,
  productoId,
  cantidad
) => {
  // Validaciones
  if (!cartId || !productoId || !cantidad || cantidad < 1) {
    const err = new Error(
      "Debe proporcionar cartId, productoId y una cantidad válida"
    );
    err.status = 400;
    throw err;
  }

  // Buscar carrito
  const carrito = await Carrito.findById(cartId);

  if (!carrito) {
    const err = new Error("Carrito no encontrado");
    err.status = 404;
    throw err;
  }

  // Verificar que esté activo
  if (carrito.estado !== "activo") {
    const err = new Error("No se puede modificar un carrito finalizado");
    err.status = 400;
    throw err;
  }

  // Buscar producto
  const producto = await Producto.findById(productoId);
  if (!producto) {
    const err = new Error("Producto no encontrado");
    err.status = 404;
    throw err;
  }

  // Buscar si el producto ya existe en el carrito
  const productoEnCarrito = carrito.productos.find(
    (item) => item.producto.toString() === productoId
  );

  if (productoEnCarrito) {
    // Aumentar cantidad
    productoEnCarrito.cantidad += cantidad;
  } else {
    // Agregar nuevo producto
    carrito.productos.push({
      producto: productoId,
      cantidad,
    });
  }

  // Recalcular total del carrito
  carrito.total = await calcularTotalCarrito(carrito.productos);

  // Guardar cambios
  await carrito.save();

  return {
    message: "Producto agregado al carrito correctamente",
    data: carrito,
  };
};

// Eliminar un producto del carrito.
export const removeProductFromCartController = async (cartId, productoId) => {
  //  Verificar carrito existente
  const cart = await Carrito.findById(cartId);
  if (!cart) {
    const error = new Error("Carrito no encontrado");
    error.statusCode = 404;
    throw error;
  }

  // Verificar producto existente (opcional, pero recomendado)
  const producto = await Producto.findById(productoId);
  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }

  // Buscar el producto dentro del carrito
  const productoIndex = cart.productos.findIndex(
    (p) => p.producto.toString() === productoId
  );

  if (productoIndex === -1) {
    const error = new Error("El producto no existe en este carrito");
    error.statusCode = 400;
    throw error;
  }

  // Eliminar producto del carrito
  cart.productos.splice(productoIndex, 1);

  // Recalcular totales
  cart.total = cart.productos.reduce((acc, p) => {
    return acc + p.subtotal;
  }, 0);

  //Guardar cambios
  await cart.save();

  return {
    message: "Producto eliminado del carrito con éxito",
    data: cart,
  };
};

// Borrar un carrito completo
export const deleteCartController = async (cartId) => {
  if (!cartId) {
    const err = new Error("Debe proporcionar el ID del carrito");
    err.status = 400;
    throw err;
  }

  // Buscar carrito
  const carrito = await Carrito.findById(cartId);

  if (!carrito) {
    const err = new Error("Carrito no encontrado");
    err.status = 404;
    throw err;
  }

  // Eliminar carrito
  await Carrito.findByIdAndDelete(cartId);

  return {
    message: "Carrito eliminado correctamente",
    data: carrito,
  };
};

// Vaciar los productos de un carrito sin eliminar el carrito.
export const clearCartController = async (cartId) => {
  if (!cartId) {
    const err = new Error("Debe proporcionar un cartId válido.");
    err.status = 400;
    throw err;
  }

  const carrito = await Carrito.findById(cartId);

  if (!carrito) {
    const err = new Error("Carrito no encontrado.");
    err.status = 404;
    throw err;
  }

  if (carrito.estado !== "activo") {
    const err = new Error("No se puede modificar un carrito finalizado.");
    err.status = 400;
    throw err;
  }

  // Vaciar productos y resetear total
  carrito.productos = [];
  carrito.total = 0;

  await carrito.save();

  return {
    message: "Carrito vaciado correctamente.",
    data: carrito,
  };
};

// Finalizar el carrito y crear un pedido asociado
export const checkoutCartController = async (cartId, metodoPago, direccion) => {
  //  Buscar carrito
  const carrito = await Carrito.findById(cartId).populate("productos.producto");

  if (!carrito) {
    const error = new Error("Carrito no encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (carrito.productos.length === 0) {
    const error = new Error("El carrito está vacío, no se puede finalizar");
    error.statusCode = 400;
    throw error;
  }

  //  Crear estructura de productos para el pedido
  const productosPedido = carrito.productos.map((item) => ({
    producto: item.producto._id,
    cantidad: item.cantidad,
    precioUnitario: item.producto.precio,
  }));

  // Calcular total
  const total = productosPedido.reduce(
    (acc, item) => acc + item.cantidad * item.precioUnitario,
    0
  );

  // Crear pedido
  const nuevoPedido = await Pedido.create({
    usuario: carrito.usuario,
    productos: productosPedido,
    total,
    metodoPago,
    direccion,
    estado: "pendiente",
  });

  // Cambiar estado del carrito
  carrito.estado = "finalizado";

  carrito.productos = [];
  await carrito.save();

  return {
    message: "Carrito finalizado y pedido generado correctamente",
    data: nuevoPedido,
  };
};
