/**
 * @file PodcastDetail.jsx
 * @description Displays detailed information for a selected podcast,
 * including its description, metadata, seasons, and episodes.
 * Allows playback through the global audio player and supports
 * favouriting individual episodes.
 *This component renders the detailed view of a selected podcast.
It allows the user to:

View podcast metadata (title, description, total seasons/episodes, last updated)

Switch between seasons via a dropdown

View all episodes in a season

Play an episode via the global AudioPlayerContext

Add or remove episodes from favourites via the FavouritesContext

It integrates React Context, React Router, 
and local component state to create an interactive, data-driven
 UI that maintains playback and favourite functionality across the app.
 *
 *
 *
 */

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AudioPlayerContext } from "../../context/AudioPlayercontext.jsx";
import { FavouritesContext } from "../../context/FavouritesContext.jsx";
import { formatDate } from "../../utils/formatDate.js";
import GenreTags from "../UI/GenreTags.jsx";
import styles from "./PodcastDetail.css";

/**
 * PodcastDetail component
 *
 * Displays a detailed view of a specific podcast, including:
 * - Title, image, description, and genre tags
 * - Last updated date and total seasons/episodes
 * - Interactive season selector
 * - Episode list with playback and favourite controls
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data object
 * @param {string} props.podcast.id - Podcast ID
 * @param {string} props.podcast.title - Podcast title
 * @param {string} props.podcast.description - Podcast description
 * @param {string} props.podcast.image - Podcast cover image URL
 * @param {string} props.podcast.updated - ISO date string for last update
 * @param {Array<Object>} props.podcast.seasons - Array of season objects, each containing episodes
 * @param {Array<Object>} props.genres - List of genres for the podcast
 * @returns {JSX.Element} The rendered podcast detail view
 */
export default function PodcastDetail({ podcast, genres }) {
  /** @type {[number, Function]} selectedSeasonIndex - Index of the currently selected season */
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  /** Current season based on dropdown selection */
  const season = podcast.seasons[selectedSeasonIndex];

  const navigate = useNavigate();

  /** Access global audio player controls from context */
  const { play } = useContext(AudioPlayerContext);

  /** Access favourites management functions from context */
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  return (
    <div className={styles.container}>
      {/* Back navigation button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Podcast header section */}
      <div className={styles.header}>
        <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />

        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

          {/* Podcast metadata info */}
          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres} />
              </div>
              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>
              <div>
                <p>Total Seasons:</p>
                <strong>{podcast.seasons.length} Seasons</strong>
              </div>
              <div>
                <p>Total Episodes:</p>
                <strong>
                  {podcast.seasons.reduce(
                    (acc, s) => acc + s.episodes.length,
                    0
                  )}{" "}
                  Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season details section */}
      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            {/* Season image */}
            <img
              className={styles.seasonCover}
              src={season.image}
              alt={season.title}
            />

            {/* Season title, description, and episode count */}
            <div>
              <h3>
                Season {selectedSeasonIndex + 1}: {season.title}
              </h3>
              <p>{season.description}</p>
              <p className={styles.releaseInfo}>
                {season.episodes.length} Episodes
              </p>
            </div>
          </div>

          {/* Season selection dropdown */}
          <select
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
            className={styles.dropdown}
          >
            {podcast.seasons.map((s, i) => (
              <option key={i} value={i}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Episode list */}
        <div className={styles.episodeList}>
          {season.episodes.map((ep, index) => (
            <div key={index} className={styles.episodeCard}>
              {/* Episode image */}
              <img
                className={styles.episodeCover}
                src={season.image}
                alt={ep.title}
              />

              <div className={styles.episodeInfo}>
                {/* Episode title */}
                <p className={styles.episodeTitle}>
                  Episode {index + 1}: {ep.title}
                </p>

                {/* Episode description */}
                <p className={styles.episodeDesc}>{ep.description}</p>

                {/* Play button - triggers global audio player */}
                <button
                  className={styles.playButton}
                  onClick={() =>
                    play({
                      src: ep.file,
                      title: ep.title,
                      show: podcast.title,
                      episode: ep.id,
                      showId: podcast.id,
                      seasonIndex: selectedSeasonIndex,
                      episodeId: ep.id,
                    })
                  }
                >
                  Play
                </button>

                {/* Favourite button - toggles favourite status */}
                <button
                  className={styles.favButton}
                  onClick={() =>
                    toggleFavourite({
                      title: ep.title,
                      show: podcast.title,
                      showId: podcast.id,
                      seasonIndex: selectedSeasonIndex,
                      episodeId: ep.id,
                    })
                  }
                  aria-label="Toggle favourite"
                >
                  {isFavourite({
                    id: ep.id,
                    showId: podcast.id,
                  })
                    ? "❤️"
                    : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
