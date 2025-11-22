import morgan from 'morgan';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Crear __filename y __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupLogger = (app) => {
  const logFormat = process.env.MORGAN_LOG;

  console.log(`- Morgan Logger - usando formato: ${logFormat}\n`);

  if (logFormat === 'dev') {
    app.use(morgan('dev'));
  } else {
    // Ruta donde se crea la carpeta logs
    const logDirectory = join(__dirname, '..', 'logs');

    if (!existsSync(logDirectory)) {
      mkdirSync(logDirectory, { recursive: true });
    }

    const accessLogStream = createWriteStream(
      join(logDirectory, 'access.log'),
      { flags: 'a' }
    );

    app.use(morgan(logFormat, { stream: accessLogStream }));
  }
};

export default setupLogger;
