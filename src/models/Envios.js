import { Schema, model } from "mongoose";

const envioSchema = new Schema(
  {
    pedido: {
      type: Schema.Types.ObjectId,
      ref: "Pedido",
      required: true,
    },
    direccion: {
      calle: String,
      numero: String,
      ciudad: String,
      provincia: String,
      codigoPostal: String,
      pais: String,
    },
    estado: {
      type: String,
      enum: ["pendiente", "en camino", "entregado"],
      default: "pendiente",
    },
  },
  { versionKey: false }
);

export default model("Envio", envioSchema);
