import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";


const app = express();

//Middlewares
dotenv.config({ quiet: true });
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api", (req, res) => {
  res.send("welcome to the api");
});

export default app;