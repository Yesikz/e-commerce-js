const errorHandler = (err, req, res, next) => {
  // Log en consola para desarrollo
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  let statusCode = err.status || 500;
  let message = err.message || "Error interno del servidor";

  // Ajustes por tipo de error
  switch (err.name) {
    case "ValidationError": // Mongoose o Joi
    case "JoiError":
      statusCode = 400;
      break;
    case "MongoDatabaseError":
      statusCode = 500;
      break;
    case "UnauthorizedError":
      statusCode = 401;
      break;
    case "CastError": // Mongoose ObjectId inválido
      statusCode = 400;
      message = "ID inválido";
      break;
    default:
      break;
  }

  res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
    type: err.name || "ServerError",
  });
};

export default errorHandler;
