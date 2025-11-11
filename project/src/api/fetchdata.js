import { useEffect } from "react";

/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 *
 **/
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
    const res = await fetch("https://podcast-api.netlify.app");
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcasts(data);
  } catch (err) {
    console.error("Fetching podcasts Failed:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

export async function fetchSinglePodcast(id, setPodcast, setError, setLoading) {
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcast(data);
  } catch (err) {
    console.error("Fetching podcasts Failed:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

/**
 * Custom hook to fetch a single podcast by ID.
 *
 * @param {string} id - The ID of the podcast to fetch.
 * @param {Function} setPodcast - State setter function to update the podcast data.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 */
export function useFetchSinglePodcast(id, setPodcast, setError, setLoading) {
  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id, setPodcast, setError, setLoading]);

  useEffect(() => {
    if (!loading && !error) {
      console.log("Podcast data:", podcast);
    }
  }, [podcast, loading, error]);
}
