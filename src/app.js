import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRoute.js";
import setupLogger from "./config/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

//Middlewares
dotenv.config({ quiet: true });
app.use(morgan("dev"));
app.use(express.json());

// Middleware global de manejo de errores
app.use(errorHandler);

// Logging de solicitudes
setupLogger(app);

//Ruta raiz
app.use("/", mainRouter);

export default app;
