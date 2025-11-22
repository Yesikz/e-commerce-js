import { Schema, model } from "mongoose";

const envioSchema = new Schema(
  {
    direccion: {
      calle: String,
      numero: String,
      ciudad: String,
      provincia: String,
      codigoPostal: String,
      pais: String,
    },
    costo: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["preparando", "en camino", "entregado"],
      default: "preparando",
    },
  },
  { versionKey: false }
);

export default model("Envio", envioSchema);
