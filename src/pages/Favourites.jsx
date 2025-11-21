import React, { useContext, useState, useMemo } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import EpisodeCard from "../components/Podcast/EpisodeCard";
import styles from "./Favourites.module.css";

/**
 * Favourites Component
 * ---------------------
 * Renders a user's favourited podcast episodes, grouped by show.
 * Includes sorting and show-filtering options.
 */
export default function Favourites() {
  // Extract favourites and sorting function from context
  const { favourites, sortFavourites } = useContext(FavouritesContext);

  // Local state controlling which show group is displayed
  const [showFilter, setShowFilter] = useState("all");

  /**
   * mapEpisodeForCard
   * ------------------
   * Normalizes a favourite episode object into the format expected by EpisodeCard.
   *
   * @param {Object} ep - Raw episode object from the favourites context.
   * @returns {Object} Normalized episode data.
   */
  const mapEpisodeForCard = (ep) => ({
    id: ep.id,
    title: ep.title || "",
    description: ep.description || "",
    // Flexible mapping to handle different audio source field names
    src:
      ep.src || ep.audio || ep.audioUrl || ep.file || ep.enclosure?.url || "",
    season: ep.season || ep.seasonIndex || 1,
    number: ep.number || ep.episode || 1,
    showId: ep.showId,
    showTitle: ep.show,
    showImage: ep.showImage || null,
    addedAt: ep.addedAt || null,
  });

  /**
   * groupedFavourites
   * ------------------
   * Memoized structure grouping favourites by show name.
   * Mapping occurs first to ensure values match EpisodeCard expectations.
   *
   * @type {Object.<string, Array>} An object keyed by show title.
   */
  const groupedFavourites = useMemo(() => {
    return favourites.reduce((acc, fav) => {
      const mapped = mapEpisodeForCard(fav);
      const showTitle = mapped.showTitle || "Unknown Show";

      if (!acc[showTitle]) acc[showTitle] = [];
      acc[showTitle].push(mapped);

      return acc;
    }, {});
  }, [favourites]);

  // List of all unique show titles
  const allShows = Object.keys(groupedFavourites);

  /**
   * filteredShowNames
   * ------------------
   * Determines which show groups should be rendered based on user filter.
   */
  const filteredShowNames =
    showFilter === "all"
      ? allShows
      : allShows.filter((show) => show === showFilter);

  return (
    <div className={styles.container}>
      {/* Header, Sorting, and Show Filtering Controls */}
      <div className={styles.top}>
        <h1>Favourites</h1>

        <div className={styles.filtersRow}>
          {/* Sort Dropdown */}
          <select
            className={styles.sortSelect}
            onChange={(e) => sortFavourites(e.target.value)}
            defaultValue="date-desc"
          >
            <option value="title-asc">A → Z</option>
            <option value="title-desc">Z → A</option>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
          </select>

          {/* Show Filter Dropdown */}
          <select
            className={styles.sortSelect}
            value={showFilter}
            onChange={(e) => setShowFilter(e.target.value)}
          >
            <option value="all">All Shows</option>
            {allShows.map((show) => (
              <option key={show} value={show}>
                {show}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render Each Show Group */}
      {filteredShowNames.map((showTitle) => (
        <section key={showTitle} className={styles.showGroup}>
          <h2>
            {showTitle} ({groupedFavourites[showTitle].length} episode
            {groupedFavourites[showTitle].length > 1 ? "s" : ""})
          </h2>

          <ul className={styles.episodeList}>
            {groupedFavourites[showTitle].map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                showTitle={ep.showTitle}
                showImage={ep.showImage}
                hidePlayButton={false}
              />
            ))}
          </ul>
        </section>
      ))}

      {/* Empty State Message */}
      {favourites.length === 0 && <p>No favourite shows yet!</p>}
    </div>
  );
}
