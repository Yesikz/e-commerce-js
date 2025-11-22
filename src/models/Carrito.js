const carritoSchema = new mongoose.Schema(
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

export default mongoose.model("Carrito", carritoSchema);
