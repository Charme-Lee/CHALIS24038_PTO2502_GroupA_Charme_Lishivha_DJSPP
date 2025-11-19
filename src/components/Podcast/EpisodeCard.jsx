import React, { useState, useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayercontext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { formatDate } from "../../utils/formatDate";
import AudioPlayer from "../UI/AudioPlayerBar";
import styles from "./EpisodeCard.module.css";

const DESCRIPTION_LIMIT = 120;

export default function EpisodeCard({
  episode,
  showTitle,
  showImage,
  hidePlayButton = false,
  isFavouritesPage = true,
}) {
  const { play } = useContext(AudioPlayerContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  const [isExpanded, setIsExpanded] = useState(false);

  const needsReadMore =
    episode.description && episode.description.length > DESCRIPTION_LIMIT;

  const displayText =
    needsReadMore && !isExpanded
      ? `${episode.description.slice(0, DESCRIPTION_LIMIT)}...`
      : episode.description;

  const episodeId = episode.id || `${showTitle}-${episode.title}`;

  const favourited = isFavourite({
    id: episodeId,
    showId: episode.showId,
  });

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
          {/* Title only */}
          <h4>{episode.title}</h4>

          {/* ❤️ + ▶️ Play in the same row */}
          <div className={styles.actionRow}>
            <button
              onClick={handleFavorite}
              className={`fav-btn ${favourited ? "active" : ""} ${
                isFavouritesPage ? styles.favFavouritesPage : ""
              }`}
            >
              {favourited ? "❤️" : "🤍"}
            </button>

            <button
              className={`${styles.playButton} ${
                isFavouritesPage ? styles.playFavouritesPage : ""
              }`}
              onClick={() =>
                play({
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
                  id: episode.id,
                })
              }
            >
              ▶️ Play
            </button>
          </div>

          <p className={styles.muted}>
            Season {episode.season || 1} • Episode {episode.number || 1}
          </p>

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

          {episode.addedAt && (
            <p className={styles["added-date"]}>
              Added on {formatDate(episode.addedAt)}
            </p>
          )}
        </div>
      </div>

      {!hidePlayButton && (
        <AudioPlayer
          episode={episode}
          showTitle={showTitle}
          showImage={showImage}
        />
      )}
    </li>
  );
}
