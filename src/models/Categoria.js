import { Schema, model } from "mongoose";

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    descripcion: {
      type: String,
    },
  },
  { versionKey: false }
);

export default model("Categoria", categoriaSchema);
