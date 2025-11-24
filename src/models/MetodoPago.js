import { Schema, model } from "mongoose";

const metodoPagoSchema = new Schema(
  {
    nombre: {
      type: String,
      enum: ["tarjeta", "transferencia", "mercadopago"],
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },

  { versionKey: false }
);

export default model("MetodoPago", metodoPagoSchema);
