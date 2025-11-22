import { Schema, model } from "mongoose";

const marcaSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    paisOrigen: { type: String },
  },
  { versionKey: false }
);

export default model("Marca", marcaSchema);
