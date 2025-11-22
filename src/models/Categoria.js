const categoriaSchema = new mongoose.Schema(
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

export default mongoose.model("Categoria", categoriaSchema);
