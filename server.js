/* =======================================================
 * Punto de entrada de la aplicación
 * =======================================================
 * - Carga variables de entorno y la aplicación Express
 * - Conecta y sincroniza la base de datos mediante Mongoose
 * - Importa los modelos y confirma su carga
 * - Inicia el servidor en el puerto configurado
*/
import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/db/database.js';

dotenv.config({ quiet: true });

const port = process.env.PORT || 3001;

// const connectDB = require('./src/db/database'
connectDB()

  .then(() => {
    app.listen(port, () => {
      console.log(`🖥️ Servidor corriendo en http://localhost:${port}`);
    });
  });