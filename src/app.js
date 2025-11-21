import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRoute.js";
import productsRouter from "./routes/productsRoutes.js";


const app = express();

//Middlewares
dotenv.config({ quiet: true });
app.use(morgan("dev"));
app.use(express.json());

//Ruta raiz
app.use("/", mainRouter);

//Rutas de productos
app.use("/api", productsRouter);

export default app;