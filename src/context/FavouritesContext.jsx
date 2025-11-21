/**
 * @file FavouritesContext.jsx
 * @description Provides global state management for managing favourited podcast episodes.
 * Supports toggling favourites, checking favourite status, sorting, and persisting data in localStorage.
This context manages the user’s list of favourited episodes across the app.

It:

Stores favourites globally and persists them to localStorage

Lets users toggle favourites (add/remove)

Provides a helper to check favourite status

Supports sorting favourites alphabetically or by date added

This ensures users’ favourite episodes are remembered 
between sessions and displayed in an organized way. 

*/

import React, { createContext, useState, useEffect } from "react";

/**
 * FavouritesContext
 *
 * Exposes global state and helper functions related to a user’s list of favourited podcast episodes.
 *
 * @type {React.Context<Object>}
 */
export const FavouritesContext = createContext();

/**
 * FavouritesProvider component
 *
 * Wraps the app and provides favourite-related functionality such as
 * toggling episodes in/out of favourites, sorting, and localStorage persistence.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components that will consume this context
 * @returns {JSX.Element} Context provider for favourites management
 */
export function FavouritesProvider({ children }) {
  /**
   * State for storing favourited episodes.
   * Initial value is loaded from localStorage for persistence between sessions.
   */
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * Persist favourites to localStorage whenever the list changes.
   *
   *
   */

  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    if (saved) {
      try {
        JSON.parse(saved);
      } catch {
        localStorage.removeItem("favourites");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Toggles an episode as favourite or unfavourite.
   * Adds the episode to favourites if not present, removes it if it already exists.
   *
   * @param {Object} episode - The episode to toggle
   * @param {string} episode.title - The title of the episode
   * @param {string} episode.show - The show name the episode belongs to
   * @param {number|string} episode.showId - The unique show ID
   * @param {number|string} episode.episodeId - The unique episode ID
   */
  const toggleFavourite = (episode) => {
    const exists = favourites.some(
      (fav) => fav.id === episode.id && fav.showId === episode.showId
    );

    if (exists) {
      setFavourites(
        favourites.filter(
          (fav) => !(fav.id === episode.id && fav.showId === episode.showId)
        )
      );
    } else {
      setFavourites([
        ...favourites,
        { ...episode, addedAt: new Date().toISOString() },
      ]);
    }
  };

  /**
   * Checks if a given episode is currently marked as favourite.
   *
   * @param {Object} episode - The episode to check
   * @returns {boolean} True if the episode is favourited, false otherwise
   */
  const isFavourite = (episode) =>
    favourites.some(
      (fav) => fav.id === episode.id && fav.showId === episode.showId
    );

  /**
   * Sorts the favourites list by the specified key (title or date).
   *
   * @param {string} key - Sorting key: 'title-asc', 'title-desc', 'date-asc', or 'date-desc'
   */
  const sortFavourites = (key) => {
    const sorted = [...favourites];

    switch (key) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      default:
        break;
    }

    setFavourites(sorted);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        sortFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
