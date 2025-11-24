import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        producto: {
          type: Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    estado: {
      type: String,
      enum: ["activo", "finalizado"],
      default: "activo",
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("Carrito", carritoSchema);
