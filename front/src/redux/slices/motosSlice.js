import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMotos } from "../../api/motos.js";

export const obtenerMotos = createAsyncThunk("motos/obtenerMotos", async () => {
  const respuesta = await fetchMotos();
  return respuesta;
});

const initialState = {
  lista: [],
  carrito: [],
  estado: "idle",
  error: null
};

export const motosSlice = createSlice({
  name: "motos",
  initialState,
  reducers: {
    agregarCarrito: (state, action) => {
      const existe = state.carrito.find(item => item.id === action.payload.id);
      if (existe) {
        state.carrito = state.carrito.map(item =>
          item.id === action.payload.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        state.carrito.push({ ...action.payload, cantidad: 1 });
      }
    },
    eliminarCarrito: (state, action) => {
      state.carrito = state.carrito.filter(item => item.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.carrito = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerMotos.pending, (state) => { state.estado = "loading"; })
      .addCase(obtenerMotos.fulfilled, (state, action) => {
        state.estado = "succeeded";
        state.lista = action.payload;
      })
      .addCase(obtenerMotos.rejected, (state, action) => {
        state.estado = "failed";
        state.error = action.error.message;
      });
  }
});

export const { agregarCarrito, eliminarCarrito, vaciarCarrito } = motosSlice.actions;
export default motosSlice.reducer;
