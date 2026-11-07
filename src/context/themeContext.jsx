import { useState, createContext } from "react";
export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const toggleTheme = () => setDarkMode((prev) => {
    const next = !prev;
    localStorage.setItem("theme", next ? "dark" : "light");
    return next;
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
