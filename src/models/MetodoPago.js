import { Schema, model } from "mongoose";

const metodoPagoSchema = new Schema(
  {
    nombre: {
      type: String,
      enum: ["tarjeta", "transferencia", "mercadopago"],
      required: true,
    },
  },
  { versionKey: false }
);

export default model("MetodoPago", metodoPagoSchema);
