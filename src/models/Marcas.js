const marcaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    paisOrigen: { type: String },
  },
  { versionKey: false }
);

export default mongoose.model("Marca", marcaSchema);
