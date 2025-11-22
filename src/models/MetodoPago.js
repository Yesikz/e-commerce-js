const metodoPagoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      enum: ["tarjeta", "transferencia", "mercadopago"],
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("MetodoPago", metodoPagoSchema);
