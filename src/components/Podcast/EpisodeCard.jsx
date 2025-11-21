import React, { useState, useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayercontext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { formatDate } from "../../utils/formatDate";
import AudioPlayer from "../UI/AudioPlayerBar";
import styles from "./EpisodeCard.module.css";

/** Maximum number of characters before collapsing description */
const DESCRIPTION_LIMIT = 120;

/**
 * EpisodeCard Component
 * ---------------------
 * Renders an individual podcast episode card, including:
 * - Title, cover image, metadata
 * - Favourite toggle
 * - Play button
 * - Collapsible description
 * - Added date (when displayed on favourites page)
 *
 * @param {Object} props
 * @param {Object} props.episode - Episode data object.
 * @param {string} props.showTitle - Parent show title.
 * @param {string|null} props.showImage - Parent show image URL.
 * @param {boolean} [props.hidePlayButton=false] - Hides play button when enabled.
 * @param {boolean} [props.isFavouritesPage=true] - Adjusts styling when rendered inside favourites page.
 */
export default function EpisodeCard({
  episode,
  showTitle,
  showImage,
  hidePlayButton = false,
  isFavouritesPage = true,
}) {
  // Audio playback context
  const { play } = useContext(AudioPlayerContext);

  // Favourite management context
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  // Controls expanded/collapsed description state
  const [isExpanded, setIsExpanded] = useState(false);

  /** Whether description should be truncated */
  const needsReadMore =
    episode.description && episode.description.length > DESCRIPTION_LIMIT;

  /** Description text shown in UI */
  const displayText =
    needsReadMore && !isExpanded
      ? `${episode.description.slice(0, DESCRIPTION_LIMIT)}...`
      : episode.description;

  /** Stable ID used for episode operations (fallback if missing) */
  const episodeId = episode.id || `${showTitle}-${episode.title}`;

  /** Check if this episode is already favourited */
  const favourited = isFavourite({
    id: episodeId,
    showId: episode.showId,
  });

  /**
   * handleFavorite
   * --------------
   * Toggles favourite state for the current episode, mapping fields into
   * the structure expected by the favourites context.
   */
  const handleFavorite = () => {
    toggleFavourite({
      id: episodeId,
      show: showTitle,
      showId: episode.showId,
      showImage: showImage || episode.showImage || null,
      title: episode.title,
      description: episode.description,
      src:
        episode.audio ||
        episode.audioUrl ||
        episode.file ||
        episode.enclosure?.url ||
        null,
      season: episode.season || episode.seasonIndex || 1,
      number: episode.number || episode.episode || 1,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <li className={styles["episode-card"]}>
      <div className={styles["episode-content"]}>
        <img
          src={episode.showImage || showImage || "/placeholder.jpg"}
          alt="cover"
          className={styles["episode-cover"]}
        />

        <div className={styles["episode-info"]}>
          {/* Episode Title */}
          <h4>{episode.title}</h4>

          {/* Favourite button + Play button */}
          <div className={styles.actionRow}>
            <button
              onClick={handleFavorite}
              className={`fav-btn ${favourited ? "active" : ""} ${
                isFavouritesPage ? styles.favFavouritesPage : ""
              }`}
            >
              {favourited ? "❤️" : "🤍"}
            </button>

            {/* Play Button */}
            {!hidePlayButton && (
              <button
                className={`${styles.playButton} ${
                  isFavouritesPage ? styles.playFavouritesPage : ""
                }`}
                onClick={() => {
                  const track = {
                    src:
                      episode.src ||
                      episode.audio ||
                      episode.audioUrl ||
                      episode.file ||
                      episode.enclosure?.url ||
                      null,
                    title: episode.title,
                    show: showTitle,
                    showImage: episode.showImage || showImage || null,
                    showId: episode.showId || showTitle,
                    seasonIndex: episode.season || 1,
                    episodeId: episode.id || `${showTitle}-${episode.title}`,
                  };

                  console.log("TRACK SENT TO PLAY():", track);
                  play(track);
                }}
              >
                ▶️ Play
              </button>
            )}
          </div>

          {/* Episode meta */}
          <p className={styles.muted}>
            Season {episode.season || 1} • Episode {episode.number || 1}
          </p>

          {/* Description with Read More toggle */}
          {episode.description && (
            <p className={styles.description}>
              {displayText}
              {needsReadMore && (
                <button
                  className={styles.readMore}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          )}

          {/* Added date (only applies if present) */}
          {episode.addedAt && (
            <p className={styles["added-date"]}>
              Added on {formatDate(episode.addedAt)}
            </p>
          )}
        </div>
      </div>

      {/* Inline audio player for quick playback */}
      {/* <AudioPlayerBar /> */}
    </li>
  );
}
