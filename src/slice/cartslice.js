import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("cart"));
const initialState = savedUser ? savedUser : [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((p) => p.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const item = state.find((p) => p.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state));
        return;
      }

      const updatedCart = state.filter(
        (p) => p.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    removeItem: (state, action) => {
      const updatedCart = state.filter(
        (p) => p.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
