/**
 * @file RecommendedCarousel.jsx
 * @description Displays a horizontally scrollable carousel of recommended podcasts
 * sourced from the global PodcastContext.
 * This component:

Uses PodcastContext to access all available podcasts

Displays them in a horizontal scrollable carousel

Each podcast card links to its detail page

Includes left/right scroll buttons with smooth animation

Uses a modular CSS file for layout and styling
 * 
 */

import React, { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Link } from "react-router-dom";
import GenreTags from "./UI/GenreTags";
import styles from "./carousel.module.css";

/**
 * RecommendedCarousel Component
 *
 * Renders a horizontally scrollable list of recommended podcasts fetched from context.
 * Each podcast displays its cover image, title, and genres, and links to its detail page.
 *
 * Includes left/right scroll buttons for intuitive navigation through the carousel.
 *
 * @component
 * @returns {JSX.Element} The rendered recommended podcast carousel.
 */
export default function RecommendedCarousel() {
  const { allPodcasts } = useContext(PodcastContext);

  /**
   * Scrolls the carousel horizontally based on direction.
   * @param {"left" | "right"} direction - Direction to scroll
   */
  const scroll = (direction) => {
    const container = document.querySelector(`.${styles.carousel}`);
    if (!container) return;

    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselContainer}>
      <h2>Recommended Shows</h2>

      {/* Left scroll button */}
      <button
        className={styles.arrow}
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        ←
      </button>

      {/* Podcast items */}
      <div className={styles.carousel}>
        {allPodcasts.map((podcast) => (
          <Link
            key={podcast.id}
            to={`/show/${podcast.id}`}
            className={styles.carouselItem}
          >
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <GenreTags genres={podcast.genres || []} />
          </Link>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        className={styles.arrow}
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}
