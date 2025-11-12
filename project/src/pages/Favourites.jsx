import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import styles from "./Favourites.css";
import { formatDate } from "../utils/formatDate";

/**
 * @function Favourites
 * @description
 * A component that displays a list of the user's favourite podcast episodes,
 * grouped by their parent show. Users can also sort favourites by title or date.
 *
 * The data is managed through `FavouritesContext`, and each episode links back
 * to its show page.
 *
 * @returns {JSX.Element} A rendered list of favourite episodes organized by show.
 *
 * @example
 * <Favourites />
 *This component displays a user’s list of favourite podcast episodes, organized by the show they belong to.
It uses FavouritesContext to access the list and a sorting function, 
allowing the user to sort favourites alphabetically or by date. Each favourite episode links back to its show page, and 
if there are none, it displays a friendly “No favourites yet!” message.
 *
 *
 */
export default function Favourites() {
  // Access favourites data and sorting function from global context
  const { favourites, sortFavourites } = useContext(FavouritesContext);

  // Define available sorting options for the dropdown menu
  const sortOptions = [
    { key: "title-asc", label: "A → Z" },
    { key: "title-desc", label: "Z → A" },
    { key: "date-desc", label: "Newest" },
    { key: "date-asc", label: "Oldest" },
  ];

  /**
   * Group favourites by the show title.
   * This allows rendering favourites organized under their respective shows.
   */
  const groupedFavourites = favourites.reduce((acc, fav) => {
    const showTitle = fav.show;
    // Create a new array for each show if it doesn't exist
    acc[showTitle] = acc[showTitle] || [];
    acc[showTitle].push(fav);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {/* Header and sort dropdown */}
      <div className={styles.top}>
        <h1>Favourites</h1>
        <select
          className={styles.sortSelect} // Styled dropdown
          onChange={(e) => sortFavourites(e.target.value)} // Sort when option selected
          defaultValue="date-desc" // Default sort: newest first
        >
          {sortOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render favourites grouped by show title */}
      {Object.entries(groupedFavourites).map(([showTitle, episodes]) => (
        <div key={showTitle} className={styles.showGroup}>
          <h2>{showTitle}</h2>
          {episodes.map((episode) => (
            <div key={episode.episodeId} className={styles.episode}>
              {/* Link to the show page */}
              <Link to={`/show/${episode.showId}`}>
                <span>{episode.title}</span> (Season {episode.seasonIndex + 1})
              </Link>

              {/* Display formatted date episode was added */}
              <span className={styles.addedDate}>
                Added: {formatDate(episode.addedAt)}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Fallback message if no favourites exist */}
      {favourites.length === 0 && <p>No favourites yet!</p>}
    </div>
  );
}
