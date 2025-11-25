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
    costo: {
      type: Number,
      required: true,
      min: 0
    },
    estado: {
      type: String,
      enum: ["preparando", "en camino", "entregado"],
      default: "preparando",
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Envio", envioSchema);
