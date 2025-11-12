/**
 * @file PodcastCard.jsx
 * @description A presentational component that displays a single podcast card
 * including its image, title, season count, genre tags, and last updated date.
 * Clicking the card navigates the user to the podcast's detailed show page.
 This component renders a clickable podcast preview card that displays the show’s:

cover image

title

number of seasons

genres

last updated date

When clicked (or activated via keyboard), it navigates to the show’s detailed route (/show/:id) using React Router’s useNavigate.

It also imports and uses a 
GenreTags UI component for displaying genre badges and 
formatDate to format the “updated” timestamp.



*/

import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastCard.module.css";
import GenreTags from "../UI/GenreTags";

/**
 * PodcastCard component
 *
 * Renders a clickable podcast preview card that displays
 * key podcast details such as title, image, number of seasons,
 * and the last updated date. On click, the user is navigated
 * to the podcast's detailed view.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.podcast - The podcast data to render
 * @param {string} props.podcast.id - Unique identifier of the podcast
 * @param {string} props.podcast.title - The podcast title
 * @param {string} props.podcast.image - URL to the podcast image
 * @param {number} props.podcast.seasons - Total number of seasons available
 * @param {string} props.podcast.updated - ISO-formatted date string for last update
 * @param {Array<Object>} props.podcast.genres - List of genre objects related to the podcast
 * @returns {JSX.Element} A rendered podcast card component
 */
export default function PodcastCard({ podcast }) {
  const navigate = useNavigate();

  /**
   * Navigates to the podcast's show details page.
   *
   * @param {Object} preview - The podcast preview data
   * @param {string} preview.id - The podcast ID
   * @param {Array<Object>} preview.genres - Array of genre data for display
   */
  const handleNavigate = (preview) => {
    navigate(`/show/${preview.id}`, { state: { genres: preview.genres } });
  };

  return (
    <div
      className={styles.card}
      onClick={() => handleNavigate(podcast)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleNavigate(podcast)} // Accessibility for keyboard navigation
    >
      {/* Podcast cover image */}
      <img
        src={podcast.image}
        alt={podcast.title}
        className={styles.image}
        loading="lazy"
      />

      {/* Podcast title */}
      <h3 className={styles.title}>{podcast.title}</h3>

      {/* Number of seasons */}
      <p className={styles.seasons}>{podcast.seasons} seasons</p>

      {/* Genre tags */}
      <GenreTags genres={podcast.genres} />

      {/* Last updated date */}
      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );
}
