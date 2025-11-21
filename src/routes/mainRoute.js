import { Router } from "express";

const mainRouter = Router();

// Ruta raíz
mainRouter.get("/", (req, res) => {
  res.send("Welcome to my Api with Express!!! 👽");
});

export default mainRouter;