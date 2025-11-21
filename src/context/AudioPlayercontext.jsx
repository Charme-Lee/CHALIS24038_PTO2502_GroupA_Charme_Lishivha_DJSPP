/**
 * @file AudioPlayerContext.js
 * @description Provides a global audio player context for the podcast app.
 * This context manages playback state, current track info, and audio controls
 * that persist across pages.
 */

/**
 * This file defines a React Context Provider that manages a 
 * global audio player.
It:

Creates and stores an Audio element (audioRef)

Tracks state: current track, playback status, progress, and duration

Provides control functions: play, pause, and seek

Listens for events (timeupdate, ended, etc.) to sync UI state

Prevents accidental reloads while audio is playing

All of this allows any component in your app to access and 
control playback globally using the AudioPlayerContext.
 * 
 */

import React, { createContext, useState, useEffect, useRef } from "react";

/**
 * Global context for the audio player.
 * Provides access to playback state, track details, and control functions.
 * @type {React.Context}
 */
export const AudioPlayerContext = createContext();

/**
 * AudioPlayerProvider component
 *
 * Wraps the application with a context provider that manages
 * a persistent audio player instance and exposes controls such as play, pause, and seek.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will consume the context
 * @returns {JSX.Element} Audio player provider component
 */
export const AudioPlayerProvider = ({ children }) => {
  /**
   * Current track metadata
   * @type {{src: string, title: string, show: string, episode: string, showId: number, seasonIndex: number, episodeId: number} | null}
   */
  const [currentTrack, setCurrentTrack] = useState(null);

  /** @type {boolean} Indicates whether audio is currently playing */
  const [isPlaying, setIsPlaying] = useState(false);

  /** @type {number} Current playback progress (seconds) */
  const [progress, setProgress] = useState(0);

  /** @type {number} Total track duration (seconds) */
  const [duration, setDuration] = useState(0);

  /** @type {React.MutableRefObject<HTMLAudioElement>} Reference to the global Audio element */
  const audioRef = useRef(new Audio());

  /**
   * Effect: Attach event listeners to handle playback updates, metadata loading,
   * and cleanup when the component unmounts.
   */
  useEffect(() => {
    const audio = audioRef.current;

    /** Updates progress and duration on time change */
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    /** Sets duration when track metadata has been loaded */
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    /** Resets playback state when the audio track finishes */
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    // Register audio event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    /**
     * Warn the user before leaving or reloading the page
     * if audio is currently playing.
     */
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "Audio is playing. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup listeners when component unmounts or dependencies change
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  /**
   * Starts playing the given track.
   * Loads the track if it differs from the current one.
   *
   * @param {{src: string, title: string, show: string, episode: string, showId: number, seasonIndex: number, episodeId: number}} track - Track to play
   */

  const play = (track) => {
    if (!track?.src) return;

    const audio = audioRef.current;

    audio.pause();

    // Force reload even if src is the same
    audio.src = "";
    setTimeout(() => {
      audio.src = track.src;
      audio.currentTime = 0;
      setCurrentTrack(track);
      setProgress(0);

      audio.play().catch(console.error);
      setIsPlaying(true);
    }, 50); // 50ms delay allows the browser to register src change
  };

  /**
   * Pauses the currently playing track.
  //  */
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /**
   * Seeks the audio playback to a specific time (in seconds).
   *
   * @param {number} time - Time position to seek to (in seconds)
   */
  const seek = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // Provide state and control functions to the app
  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        play,
        pause,
        seek,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
