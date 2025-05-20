"use client";
import { createContext, useContext, useEffect, useState } from "react";
import "./ThemeProvider.css";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="layout">
        <header className="header">
          <h2>Employee Directory</h2>
          <button className="theme-toggle" onClick={toggleTheme}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? <Moon size={32} /> : <Sun size={32} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
