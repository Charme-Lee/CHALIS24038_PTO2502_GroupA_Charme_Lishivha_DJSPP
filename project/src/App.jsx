import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home.jsx";
import ShowDetail from "./pages/ShowDetails.jsx";
import { PodcastProvider } from "./context/PodcastContext.jsx";
import { AudioPlayerProvider } from "./context/AudioPlayercontext.jsx";
import AudioPlayerBar from "./components/UI/AudioPlayerBar.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import Favourites from "./pages/Favourites.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useEffect } from "react";

//This file defines the root of the Podcast Explorer application.
// It sets up global context providers to manage app-wide states like theme, audio playback, favourites, and podcasts.
// AppContent handles the main structure — rendering the header, route definitions (Home, ShowDetail, and Favourites), and the persistent AudioPlayerBar.
// A small useEffect ensures the app uses the previously saved theme (dark/light) when loaded.

/**
 * @function AppContent
 * @description
 * Defines the main application structure (header, routes, and audio player bar).
 * Also initializes and applies the saved theme mode (`dark` or `light`) from localStorage.
 *
 * @returns {JSX.Element} The main content layout of the application.
 */
function AppContent() {
  /**
   * useEffect to apply the saved theme preference (dark/light) on initial load.
   * It retrieves the value from localStorage and updates the body class accordingly.
   */
  useEffect(() => {
    const body = document.body;
    if (body) {
      const savedTheme = localStorage.getItem("theme") || "dark";
      body.classList.remove("dark", "light"); // Remove any existing theme classes
      body.classList.add(savedTheme); // Apply the saved theme
    }
  }, []);

  return (
    <>
      {/* Header navigation bar */}
      <Header />

      {/* Define all app routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/show/:id" element={<ShowDetail />} />{" "}
        {/* Single podcast detail route */}
        <Route path="/favourites" element={<Favourites />} />{" "}
        {/* Favourites page route */}
      </Routes>

      {/* Persistent audio player at the bottom of the app */}
      <AudioPlayerBar />
    </>
  );
}

/**
 * @function App
 * @description
 * The root component of the Podcast Explorer application.
 * Wraps the entire app in multiple context providers to manage state globally:
 * - ThemeProvider: handles light/dark mode
 * - AudioPlayerProvider: manages audio playback state
 * - FavouritesProvider: tracks user’s favourite podcasts
 * - PodcastProvider: manages podcast fetching, search, and sorting
 *
 * @returns {JSX.Element} The fully wrapped application entry point.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AudioPlayerProvider>
        <FavouritesProvider>
          <PodcastProvider>
            <AppContent />
          </PodcastProvider>
        </FavouritesProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
}
