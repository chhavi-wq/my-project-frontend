import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product) =>
    setCart((prev) => {
      const next = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  return (
    <CartContext.Provider value={{ cart, addToCart, count: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
