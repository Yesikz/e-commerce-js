/* ==============================================================
 * Configuración de la conexión a la DB MongoDB con Mongoose
 * ==============================================================
 * - Carga variables de entorno para la conexión a la base de datos
 * - Crea la conexión a MongoDB usando Mongoose mediante la URI
 */
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
  try {
    const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB } = process.env;

    const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

    await connect(mongoUrl);
    console.log("🗄️MongoDB conectado correctamente");

  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
