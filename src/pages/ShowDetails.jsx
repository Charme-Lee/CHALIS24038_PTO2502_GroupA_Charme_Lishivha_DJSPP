import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchdata.js";
import Loading from "../components/UI/Loading.jsx";
import Error from "../components/UI/Error.jsx";
import PodcastDetail from "../components/Podcast/PodcastDetail.jsx";

/**
 * @function ShowDetail
 * @description
 * A page component that fetches and displays detailed information
 * about a specific podcast, based on the podcast ID from the URL.
 *
 * It handles loading, error, and success states while fetching data
 * from a remote API using the `fetchSinglePodcast` helper function.
 *
 * @returns {JSX.Element|null} The rendered podcast detail view, or
 * loading/error components based on the current state.
 *This component serves as a podcast detail page.
It retrieves a podcast’s ID from the URL (via React Router), 
then fetches that podcast’s detailed data using the fetchSinglePodcast 
function. While the data is loading, it displays a loading spinner; if 
an error occurs, it shows an error message. Once the data is successfully
 loaded, 
 renders the PodcastDetail component to display the podcast information.
 * @example
 * // Example route: /show/123
 * <Route path="/show/:id" element={<ShowDetail />} />
 */
export default function ShowDetail() {
  // Get podcast ID from the route parameters
  const { id } = useParams();

  // Initialize navigation hook (reserved for future redirects if needed)
  const navigate = useNavigate();

  // Local state to store podcast data, loading, and error info
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch podcast data when the component mounts or when the ID changes.
   * Uses the fetchSinglePodcast API utility, which updates state accordingly.
   */
  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

  // Show a loading spinner or message while fetching data
  if (loading) return <Loading message="Loading podcast..." />;

  // Display an error message if the fetch operation fails
  if (error)
    return (
      <Error message={`Error occurred while fetching podcast: ${error}`} />
    );

  // If no podcast data was returned, render nothing (can be adjusted later)
  if (!podcast) return null;

  // Render the detailed podcast view with genre information
  return <PodcastDetail podcast={podcast} genres={podcast.genres || []} />;
}
