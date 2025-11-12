/**
 * @file PodcastGrid.jsx
 * @description Displays a grid of podcast cards using data provided by the PodcastContext.
 * Each card shows podcast metadata such as title, image, genres, and update date.
 * Handles empty states when no podcasts are available or match filters.
This component renders a responsive grid of podcasts using data from the PodcastContext.
It:

Retrieves filtered/paginated podcast data from context

Displays each podcast via a reusable <PodcastCard /> component

Shows a fallback message when no results match user filters or search queries

This makes it a key part of your app’s landing page, responsible for displaying
the main podcast library view in a user-friendly, adaptive layout. 

*/

import { useContext } from "react";
import PodcastCard from "./PodcastCard";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./PodcastGrid.css";

/**
 * PodcastGrid component
 *
 * Renders a responsive grid layout of podcasts.
 * Uses data from the PodcastContext to display available podcasts
 * after filtering or searching. Each podcast is represented by
 * a <PodcastCard /> component.
 *
 * If no podcasts are found, a friendly "no results" message is shown.
 *
 * @component
 * @returns {JSX.Element} A grid of podcast cards or a fallback message
 */
export default function PodcastGrid() {
  /** Retrieve the list of podcasts from global context */
  const { podcasts } = useContext(PodcastContext);

  /** If there are no matching podcasts, display a message */
  if (!podcasts.length) {
    return (
      <p className={styles.noResults}>
        No podcasts match your search or filters.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {/* Map through the list of podcasts and render each one */}
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
