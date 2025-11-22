import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { versionKey: false }
);

export default model("Carrito", carritoSchema);
