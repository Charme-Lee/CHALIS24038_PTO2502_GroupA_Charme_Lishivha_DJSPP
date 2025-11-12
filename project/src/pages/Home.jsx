import {
  SearchBar,
  SortSelect,
  GenreFilter,
  PodcastGrid,
  Pagination,
  Loading,
  Error,
} from "../components";
import styles from "./Home.module.css";
import { genres } from "../data";
import { PodcastContext } from "../context/PodcastContext";
import { useContext } from "react";
import RecommendedCarousel from "../components/RecommendedCarousel";
// The Home component is the main page of the Podcast Explorer app.
// It connects to PodcastContext to retrieve the current podcast data, loading state, and any errors from API requests.
// It renders interactive controls for search, genre filtering, and sorting, along with recommended podcasts, and conditionally displays either a loading spinner,
// an error message, or the podcast grid with pagination based on state.

/**
 * @function Home
 * @description
 * The main landing page for the Podcast Explorer app.
 *
 * This page provides users with a complete interface for discovering and browsing podcasts.
 * It integrates search, genre filtering, and sorting controls, while dynamically displaying
 * podcast results along with pagination and recommendations.
 *
 * @context PodcastContext
 * Accesses podcast data, loading, and error states from the global context to manage rendering.
 *
 * @returns {JSX.Element} The complete home page layout including filters, grid, and feedback states.
 *
 * @example
 * <Route path="/" element={<Home />} />
 */
export default function Home() {
  // Extract podcast list, loading state, and error message from context
  const { podcasts, loading, error } = useContext(PodcastContext);

  return (
    <main className={styles.main}>
      {/* Carousel displaying recommended or highlighted podcasts */}
      <RecommendedCarousel />
      {/* Top control section: search input, genre filter, and sort dropdown */}
      <section className={styles.controls}>
        <SearchBar /> {/* Search by podcast title */}
        <GenreFilter genres={genres} /> {/* Filter podcasts by genre */}
        <SortSelect /> {/* Choose sorting order (A–Z, Z–A, etc.) */}
      </section>
      {/* Conditional rendering based on loading and error states */}
      {loading && <Loading message="Loading podcasts..." />} {/* Show loader */}
      {error && (
        <Error message={`Error occurred while fetching podcasts: ${error}`} />
      )}{" "}
      {/* Show error if fetch fails */}
      {/* Show main podcast grid and pagination only when data is loaded and no errors */}
      {!loading && !error && (
        <>
          <PodcastGrid /> {/* Displays podcasts in a grid layout */}
          <Pagination /> {/* Handles navigation through multiple pages */}
        </>
      )}
    </main>
  );
}
