import { createSlice } from "@reduxjs/toolkit";

const initialState = { usuario: null };

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    login: (state, action) => { state.usuario = action.payload; },
    logout: (state) => { state.usuario = null; }
  }
});

export const { login, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;
