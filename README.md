<div align="center">
  
# 🏍️ E-commerce API  
### API RESTful construida con Node.js, Express y MongoDB para un sistema de comercio electrónico modular, seguro y escalable.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&style=for-the-badge)
![Joi](https://img.shields.io/badge/Joi-FFDD00?style=for-the-badge)

</div>

---

# 📌 Descripción General

Este proyecto es una **API RESTful** para un sistema de **e-commerce**, desarrollada con:

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT** para autenticación segura
- **Joi** para validación de datos
- **Morgan** para auditoría y logs

Diseñada con arquitectura modular y buenas prácticas para permitir escalabilidad y fácil mantenimiento.

---

🧩 Arquitectura de la API

Cliente → Rutas → Handlers → Controllers → Models → MongoDB

### Descripción de capas

- **Routes:** Definen los endpoints de la API.
- **Handlers:** Preparan los datos recibidos y llaman a los controllers correspondientes.
- **Controllers:** Contienen la lógica de negocio principal.
- **Models:** Interactúan con la base de datos MongoDB a través de Mongoose.
- **Middlewares:** Se encargan de la autenticación, validación de datos y manejo de errores.

## 🧩 Estructura del Proyecto

```bash
src/
├── config/                     # Configuración general del proyecto
│   └── logger.js               # Configuración y manejo de logs personalizados
│
├── controllers/                # Controladores: manejan la lógica de negocio
│   ├── authControllers.js
│   ├── carritoControllers.js
│   ├── categoryController.js
│   ├── enviosControllers.js
│   ├── marcasControllers.js
│   ├── metodoPagoControllers.js
│   ├── pedidosControllers.js
│   ├── productsController.js
│   └── usuarioController.js
│
├── db/                         # Conexión y configuración de la base de datos
│   └── database.js
│
├── handlers/                   # Handlers: reciben las solicitudes HTTP y llaman a los controladores
│   ├── authHandler.js
│   ├── carritoHandler.js
│   ├── categoryHandler.js
│   ├── enviosHandler.js
│   ├── marcasHandler.js
│   ├── metodoPagoHandler.js
│   ├── pedidosHandler.js
│   ├── productsHandler.js
│   └── usuarioHandler.js
│
├── logs/                       # Registro de logs de acceso y errores con morgan
│   └── access.log
│
├── middleware/                 # Middlewares de Express para validación, autorización y manejo de errores
│   ├── autenticarMiddleware.js
│   ├── autorizarMiddleware.js
│   ├── errorHandler.js
│   └── generarTokenMiddleware.js
│
├── models/                     # Modelos de base de datos
│   ├── Carrito.js
│   ├── Categorias.js
│   ├── Envios.js
│   ├── Marcas.js
│   ├── MetodoPago.js
│   ├── Pedidos.js
│   ├── Productos.js
│   ├── Usuarios.js
│   └── relations/              # Relaciones entre modelos
│
│
├── postman/                    # Importación de postman.json
│   └── E-COMMERCE MOTOS.postman_collection.json
│
│
├── Routes/                     # Definición y organización de rutas del servidor
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── enviosRoutes.js
│   ├── mainRoutes.js
│   ├── marcasRoute.js
│   ├── metodoPagoRoute.js
│   ├── pedidosRoute.js
│   ├── productsRoute.js
│   ├── userRoutes.js
│
├── validations/                # Validaciones de datos mediante Joi
│   ├── authValidation.js
│   ├── carritoValidation.js
│   ├── categoriaValidation.js
│   ├── enviosValidation.js
│   ├── marcasValidation.js
│   ├── metodoPagoValidation.js
│   ├── pedidosValidation.js
│   ├── productosValidation.js
│   ├── usuariosValidation.js
│   └── validators.js           # Función centralizada para validar datos de entrada según el modelo correspondiente.
│
├── .ENV
├── app.js                      # Configuración principal de la aplicación Express
├── .gitignore
├── package.json                # Configuración del proyecto y dependencias
└── README.md
├── server.js                   # Punto de entrada del servidor
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
