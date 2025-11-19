import React, { useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayercontext";
import styles from "./AudioPlayerBar.module.css";

// This component renders a custom audio player bar that shows the currently playing track, its progress, and playback controls.
// It integrates tightly with the AudioPlayerContext to manage shared playback state across the app — including the track’s play/pause status, progress, and duration.
// It also allows users to seek through the track using a range input and displays formatted playback time.

/**
 * @function AudioPlayer
 * @description
 * Displays an interactive audio player bar that allows users to
 * play, pause, and seek through the current audio track.
 *
 *
 * Uses the `AudioPlayerContext` to access and control playback state
 * including current track info, progress, and duration.
 *
 * @returns {JSX.Element | null} The audio player UI if a track is active, otherwise `null`.
 *
 * @example
 * // Renders automatically when `currentTrack` is available in context
 * <AudioPlayer />
 */
export default function AudioPlayer() {
  // Extract audio player state and controls from
  // console.log("EPISODE RECEIVED BY PLAYER:", episode);
  const { currentTrack, isPlaying, progress, duration, play, pause, seek } =
    useContext(AudioPlayerContext);

  /**
   * Handle user input from the seek bar.
   * Updates the audio progress position by calling the `seek` method.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Range input change event.
   */
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  /**
   * Converts time in seconds into a "minutes:seconds" format.
   *
   * @param {number} seconds - Time in seconds.
   * @returns {string} Formatted time string.
   */
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // If no audio track is currently playing, render nothing.
  if (!currentTrack) return null;

  return (
    <div className={styles.player}>
      {/* Display current track information */}
      <div className={styles.info}>
        <span>
          {currentTrack.show} - {currentTrack.title}
        </span>
      </div>

      {/* Playback controls and progress display */}
      <div className={styles.controls}>
        {/* Play or pause button based on playback state */}
        <button
          onClick={isPlaying ? pause : () => play(currentTrack)}
          className={styles.playButton}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Seek bar to adjust playback position */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          className={styles.seekBar}
        />

        {/* Display elapsed and total duration */}
        <span className={styles.time}>
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
