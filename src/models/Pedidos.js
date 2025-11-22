const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    productos: [
      {
        producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
      },
    ],

    total: { type: Number, required: true },

    metodoPago: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MetodoPago",
      required: true,
    },

    estado: {
      type: String,
      enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },

    envio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Envio",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Pedido", pedidoSchema);
