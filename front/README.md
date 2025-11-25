# NitroRiders

NitroRiders es una **tienda online de motocicletas** creada con **React**, **Redux Toolkit** y **React Router**, con un diseño moderno y responsive. Permite explorar motos, ver detalles, agregar productos al carrito, registrarse, loguearse y finalizar compras.

---

## 📁 Estructura del proyecto

```
src/
├─ api/                 # Simulación de API 
│  └─ motos.js
├─ assets/img/          # Imágenes de las motos
├─ components/
│  ├─ Header.jsx
│  ├─ Footer.jsx
│  ├─ NavBar.jsx
│  ├─ Sidebar.jsx
│  ├─ Paginacion.jsx
│  ├─ ProductCard.jsx
│  └─ MotoCardeliminar.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ Productos.jsx
│  ├─ MotoDetalle.jsx
│  ├─ Login.jsx
│  ├─ Registro.jsx
│  └─ Checkout.jsx
├─ redux/
│  ├─ store.js
│  └─ slices/
│     ├─ motosSlice.js
│     └─ usuarioSlice.js
├─ styles/
│  └─ styles.css
├─ App.jsx
├─ main.jsx
├─ index.css
└─ data/
   └─ motos.js
```

---

## ⚡ Tecnologías utilizadas

* **React** para la interfaz
* **Redux Toolkit** para manejar estado global
* **React Router** para navegación
* **CSS** para estilos modernos y responsive
* **LocalStorage** para persistir carrito de compras

---

## 🚀 Funcionalidades

* Listado de motos y filtrado por categorías
* Detalle de cada moto (imagen, descripción, precio)
* Carrito de compras 
* Registro y login de usuarios
* Checkout (simulado)
* Diseño responsive para móviles, tablet y desktop

---

## 🛠 Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el proyecto:

```bash
npm run dev
```

4. Abrir en el navegador

---

## 🧩 Redux

* `motosSlice.js`: Maneja lista de motos y carrito
* `usuarioSlice.js`: Maneja login y logout del usuario
* `store.js`: Combina todos los slices

---

## 💡 Notas

* El proyecto incluye un contexto `CartContext.jsx` que se puede eliminar si se usa solo Redux.
* Las imágenes de las motos se encuentran en `src/assets/img/`.
* Los estilos principales están en `src/style/styles.css`.



¡Listo! Ahora NitroRiders está preparado para probar y seguir desarrollando.
