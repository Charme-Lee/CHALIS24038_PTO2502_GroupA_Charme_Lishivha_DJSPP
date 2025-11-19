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
    //   toggleFavourite({
    //     id: episodeId,

    //     // show info
    //     show: showTitle,
    //     showId: episode.showId,
    //     showImage: showImage || episode.showImage || null,

    //     // full episode info
    //     title: episode.title,
    //     description: episode.description,
    //     audio: episode.audio || episode.file || null,

    //     season: episode.season || episode.seasonIndex || 1,
    //     number: episode.number || episode.episode || 1,

    //     addedAt: new Date().toISOString(),
    //   });
    // };

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
        null, // 👈 MUST BE src

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
          <h4>
            {episode.title}
            <button
              onClick={handleFavorite}
              className={`fav-btn ${favourited ? "active" : ""}`}
            >
              {favourited ? "❤️" : "🤍"}
            </button>
          </h4>

          <p className={styles.muted}>
            Season {episode.season || 1} • Episode {episode.number || 1}
          </p>

          {episode.description && (
            <p className={styles.description}>{displayText}</p>
          )}

          {episode.addedAt && (
            <p className={styles["added-date"]}>
              Added on {formatDate(episode.addedAt)}
            </p>
          )}
        </div>
      </div>
      {/* <button
        className={styles.playButton}
        onClick={() =>
          play({
            src: episode.src, // IMPORTANT — must be src
            title: episode.title,
            show: showTitle,
          })
        }
      >
        ▶️ Play
      </button> */}
      <button
        className={styles.playButton}
        onClick={() =>
          play({
            src:
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
