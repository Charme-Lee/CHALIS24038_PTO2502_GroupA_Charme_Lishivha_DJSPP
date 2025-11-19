/**
 * @file ThemeContext.jsx
 * @description Provides global theme management for the application.
 * Allows toggling between "light" and "dark" modes and persists the user's
 * preference in localStorage. Automatically updates the document body’s
 * class and inline styles to match the selected theme.
 * This file defines a React Context (ThemeContext) and its provider (ThemeProvider) for managing the app’s light/dark theme globally.

It reads the saved theme from localStorage (default: dark)

Applies the theme to the <body> via CSS classes and inline styles

Persists theme changes in localStorage automatically

Provides a toggleTheme() function via context for switching themes anywhere in the app

It’s meant to wrap your entire app at a high level (e.g., in App.jsx or main.jsx) 
to ensure all components have access to the current theme state.
 * 
 */

import React, { createContext, useState, useEffect } from "react";

/**
 * ThemeContext
 *
 * Provides access to the current theme and a method to toggle it.
 * @type {React.Context<{theme: string, toggleTheme: Function}>}
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider component
 *
 * Wraps the application in a context provider that manages the current
 * visual theme (dark or light). The theme preference is persisted across
 * sessions using localStorage and applied to the document body element.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The children components that will consume the context
 * @returns {JSX.Element} The ThemeContext provider with current theme state
 */
export function ThemeProvider({ children }) {
  /**
   * State to store the active theme.
   * Initializes from localStorage or defaults to "dark".
   */
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "dark";
    console.log("Initial theme from localStorage:", initialTheme);
    return initialTheme;
  });

  /**
   * Apply theme changes to document.body whenever the theme state updates.
   * Updates both the body’s CSS class list and inline fallback styles.
   */
  useEffect(() => {
    const body = document.body;

    if (body) {
      console.log("Applying theme:", theme);

      // Remove old theme classes and apply the new one
      body.classList.remove("dark", "light");
      body.classList.add(theme);

      // Persist the current theme in localStorage
      localStorage.setItem("theme", theme);

      console.log("Body classes after update:", body.className);

      // Inline fallback styles (for browsers without proper CSS class binding)
      body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f5f5f5";
      body.style.color = theme === "dark" ? "#fff" : "#333";
    } else {
      console.error("document.body is not available");
    }
  }, [theme]);

  /**
   * Toggles the current theme between "dark" and "light".
   * Logs the transition for debugging purposes.
   *
   * @function
   */
  const toggleTheme = () => {
    console.log("Toggling theme, current theme:", theme);
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      console.log("New theme:", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
