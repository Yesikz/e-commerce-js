import { Schema, model } from "mongoose";

const pedidoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    productos: [
      {
        producto: { type: Schema.Types.ObjectId, ref: "Producto" },
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    metodoPago: {
      type: Schema.Types.ObjectId,
      ref: "MetodoPago",
      required: true,
    },

    direccion: {
      calle: String,
      numero: String,
      ciudad: String,
      provincia: String,
      codigoPostal: String,
      pais: String,
    },
    estado: {
      type: String,
      enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Pedido", pedidoSchema);
