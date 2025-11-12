import { useState, useEffect, useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./SearchBar.css";

/**
 * This component provides a search bar that lets users filter podcasts by name.
It uses useContext to access the global search state from PodcastContext and applies a 300ms debounce so 
the search query updates only after the user stops typing briefly — improving performance and user experience.
 * 
 * / 

/**
 * @function SearchBar
 * @description
 * A controlled search input component that updates the global podcast search query.
 * Uses a debounced update to prevent excessive state changes while typing.
 *
 * @returns {JSX.Element} A styled input field for searching podcasts.
 *
 * @example
 * <SearchBar />
 */
export default function SearchBar() {
  // Access the current search term and setter function from PodcastContext
  const { search, setSearch } = useContext(PodcastContext);

  // Local input state to hold the user's current typing value
  const [value, setValue] = useState(search);

  /**
   * Debounce effect:
   * Waits 300ms after the user stops typing before updating the global search state.
   * Prevents unnecessary re-renders or API calls for every keystroke.
   */
  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(id); // Cleanup previous timer if user types again
  }, [value]);

  return (
    // Render the search input field
    <input
      type="search"
      placeholder="Search podcasts…" // Placeholder text inside the input
      value={value} // Controlled input bound to local state
      onChange={(e) => setValue(e.target.value)} // Update local state on each keystroke
      className={styles.searchInput} // Apply CSS module styling
    />
  );
}
