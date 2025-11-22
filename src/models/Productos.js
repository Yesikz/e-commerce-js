const productoSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },

    marca: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marca",
      required: true,
    },

    imagenes: [String],

    activo: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Producto", productoSchema);
