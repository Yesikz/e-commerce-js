import { Schema, model } from "mongoose";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    año: {
      type: Number,
    },

    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },

    marca: {
      type: Schema.Types.ObjectId,
      ref: "Marca",
      required: true,
    },

    imagenes: [String],

    activo: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("Producto", productoSchema);