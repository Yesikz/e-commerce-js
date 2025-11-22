import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    nombreUsuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    telefono: { type: String },
    activo: { type: Boolean, default: true },
    rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },

    direccion: [
      {
        calle: String,
        numero: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String,
        pais: String,
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

export default model('Usuario', usuarioSchema);
