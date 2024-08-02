import { IProduct } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  value: [] as (IProduct & { quantity: number })[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter((x) => x.id !== action.payload);
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },
    incrementCartItem: (state, action) => {
      const item = state.value.find((x) => x.id === action.payload);

      if (item) item.quantity++;
    },
    decrementCartItem: (state, action) => {
      const item = state.value.find((x) => x.id === action.payload);

      if (item)
        if (item.quantity > 1) item.quantity--;
        else state.value = state.value.filter((x) => x.id !== action.payload);
    },
    setCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.value.find((x) => x.id === id);

      if (item) item.quantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCart,
  incrementCartItem,
  decrementCartItem,
  setCartItemQuantity,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.value;

export default cartSlice.reducer;
