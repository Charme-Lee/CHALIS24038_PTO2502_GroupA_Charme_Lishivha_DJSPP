/**
 * @file PodcastContext.jsx
 * @description Provides centralized state management for all podcast data, filters,
 * pagination, and sorting behavior throughout the application.
 * Fetches and stores podcasts from the API and exposes utility values via context.
 */

import React, { createContext, useEffect, useState } from "react";
import { fetchPodcasts } from "../api/fetchData";

/**
 * @typedef {Object} Podcast
 * @property {number} id - Unique identifier for the podcast.
 * @property {string} title - The title of the podcast.
 * @property {string} updated - ISO date string representing last update.
 * @property {number[]} genres - Array of genre IDs associated with the podcast.
 */

/**
 * PodcastContext
 *
 * Global React context used to provide podcast data and related control logic
 * (filters, pagination, sorting) to all components within the app.
 *
 * @type {React.Context<Object>}
 */
export const PodcastContext = createContext();

/**
 * Sorting options used across the podcast library.
 * These keys drive the order of displayed podcast cards.
 *
 * @type {{key: string, label: string}[]}
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
];

/**
 * PodcastProvider component
 *
 * Wraps the application in a provider that supplies all podcast-related state.
 * Handles fetching data, filtering by search and genre, sorting, and responsive pagination.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child elements that will consume the context
 * @returns {JSX.Element} PodcastContext provider with managed state
 */
export function PodcastProvider({ children }) {
  // --- Core data and API state ---
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Filters and controls ---
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");

  // --- Pagination state ---
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /**
   * Fetches podcasts from the API when the provider mounts.
   * Sets loading and error states appropriately.
   */
  useEffect(() => {
    fetchPodcasts(setAllPodcasts, setError, setLoading);
  }, []);

  /**
   * Resets pagination when filter or search parameters change.
   */
  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  /**
   * Dynamically determines how many items should be displayed per page
   * depending on the viewport width. Updates on resize.
   */
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;

      // Smaller screens use a fixed 10 items per page
      if (screenW <= 1024) {
        setPageSize(10);
        return;
      }

      // Estimate number of columns and rows based on layout width
      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.floor(screenW / cardWidth);
      const pageSize = columns * maxRows;

      setPageSize(pageSize);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  /**
   * Filters and sorts the full list of podcasts based on current search input,
   * genre selection, and sorting preference.
   *
   * @returns {Podcast[]} Filtered and sorted array of podcasts
   */
  const applyFilters = () => {
    let data = [...allPodcasts];

    // --- Search filter ---
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    // --- Genre filter ---
    if (genre !== "all") {
      data = data.filter((p) => p.genres.includes(Number(genre)));
    }

    // --- Sorting logic ---
    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      default:
        break;
    }

    return data;
  };

  // --- Derived data ---
  const filtered = applyFilters();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /**
   * Value exposed to context consumers — includes data, filters,
   * pagination, and handlers.
   */
  const value = {
    loading,
    error,
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,
    page: currentPage,
    setPage,
    totalPages,
    podcasts: paged,
    allPodcastsCount: filtered.length,
    allPodcasts, // raw dataset for use in detailed podcast pages
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
