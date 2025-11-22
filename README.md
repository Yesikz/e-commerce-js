# 🏍️ E-commerce API

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, y **MongoDB**, pensada para un sistema de **e-commerce** modular y escalable.
La estructura sigue buenas prácticas de arquitectura limpia, separando controladores, manejadores, validaciones, middlewares y modelos de base de datos.

---

## 🧩 Estructura del Proyecto

```bash
src/
├── config/                     # Configuración general del proyecto
│   └── logger.js               # Configuración y manejo de logs personalizados
│
├── controllers/                # Controladores: manejan la lógica de negocio
│
├── db/                         # Conexión y configuración de la base de datos
│   └── database.js
│
├── handlers/                   # Handlers: reciben las solicitudes HTTP y llaman a los controladores
│
├── logs/                       # Registro de logs de acceso y errores con morgan
│   └── access.log
│
├── middleware/                 # Middlewares de Express para validación, autorización y manejo de errores
│   ├── errorHandler.js
│
├── models/                     # Modelos de base de datos (definidos con Sequelize)
│   └── relations/              # Relaciones entre modelos
│
│
├── postman/                    # Importación de postman.json
│   └── Api prueba.postman_collection.json
│
│
├── Routes/                     # Definición y organización de rutas del servidor
│   ├── mainRoute.js
│
├── validations/                # Validaciones de datos mediante Joi
│
├── validators/
│   └── validators.js           # Función centralizada para validar datos de entrada según el modelo correspondiente.
│
├── app.js                      # Configuración principal de la aplicación Express
├── .gitignore
├── index.js                    # Punto de entrada del servidor
├── package.json                # Configuración del proyecto y dependencias
└── README.md
```

### 📄 Archivos raíz

- `.env` → Variables de entorno del proyecto (no se versiona).
- `.gitignore` → Archivos y carpetas ignoradas por Git.
- `package.json` / `package-lock.json` → Dependencias, scripts y metadatos del proyecto.
- `README.md` → Documentación principal del proyecto.

---

## ⚙️ Configuración del entorno

El archivo `.env` debe contener las siguientes variables:

```bash
# Puerto donde corre tu servidor.
PORT=3000

# Entorno actual del servidor.
NODE_ENV=development #production
MORGAN_LOG=dev #combined

# Credenciales de MongoDB (opcional si usas PostgreSQL)
MONGO_USER=
MONGO_PASS=
MONGO_CLUSTER=
MONGO_DB=

# Clave secreta para JWT
JWT_SECRET=
JWT_EXPIRES_IN=1h
```

---

## 🚀 Instalación y Ejecución

1. **Clona el repositorio:**

   ```bash
   https://github.com/magentaPost/e-commerce-js.git
   cd ecommerce
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura tu archivo `.env`** según los valores indicados arriba.

4. **Ejecuta el servidor en modo desarrollo:**

   ```bash
   npm run dev
   ```

5. **O en modo producción:**
   ```bash
   npm start
   ```

---

## 🧠 Scripts disponibles

- `npm run dev` → Ejecuta el servidor con **Nodemon** para recarga automática.
- `npm start` → Inicia el servidor en modo producción.
- `npm test` → (opcional) Ejecuta las pruebas si están configuradas.

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Joi** (validaciones)
- **JWT** (autenticación)
- **Morgan** (logs HTTP)

---

## 📦 Estructura modular

La API sigue una separación clara por capas:

- **Handlers:** Interactúan con las rutas HTTP.
- **Controllers:** Contienen la lógica de negocio.
- **Middlewares:** Validan, autentican y gestionan errores.
- **Models:** Definen los esquemas de base de datos.
- **Validations:** Validan datos de entrada antes de llegar a la lógica principal.

---

## 📚 Autor

Desarrollado
📘 En curso: Introducción a JavaScript  
🚀 Proyecto práctica profesional
