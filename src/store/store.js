import { configureStore } from "@reduxjs/toolkit"
import cartitem from "../slice/cartslice"

export const store = configureStore({
  reducer: {
    cart: cartitem,
  },
})
