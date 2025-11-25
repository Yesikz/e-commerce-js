import { configureStore } from "@reduxjs/toolkit";
import motosReducer from "./slices/motosSlice";
import usuarioReducer from "./slices/usuarioSlice";

export const store = configureStore({
  reducer: {
    motos: motosReducer,
    usuario: usuarioReducer
  }
});
