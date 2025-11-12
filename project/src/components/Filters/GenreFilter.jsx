import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./GenreFilter.module.css";
/**This component renders a dropdown menu that lets the user select a podcast genre.
It uses useContext to read and update the current genre state stored in PodcastContext, so when the user selects
 a different genre, it updates the global filter used elsewhere in the app. */

/**
 * @function GenreFilter
 * @description
 * A dropdown (select) component that allows users to filter podcasts by genre.
 * It uses React context (`PodcastContext`) to access and update the currently selected genre.
 *
 * @param {{genres: {id: number, name?: string, title?: string}[]}} props -
 * An array of genre objects, each containing an `id` and a `name` or `title`.
 *
 * @returns {JSX.Element} A styled <select> element populated with available genres.
 *
 * @example
 * <GenreFilter genres={[{id: 1, title: "Comedy"}, {id: 2, title: "News"}]} />
 */
export default function GenreFilter({ genres }) {
  // Access the current genre and its setter function from the Podcast context
  const { genre, setGenre } = useContext(PodcastContext);

  return (
    // Render a dropdown that allows users to choose a genre filter
    <select
      className={styles.select} // Apply CSS module styling
      value={genre} // Controlled value from context
      onChange={(e) => setGenre(e.target.value)} // Update context when selection changes
    >
      {/* Default option to show all genres */}
      <option value="all">All Genres</option>

      {/* Dynamically generate dropdown options from the genres prop */}
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.title}
        </option>
      ))}
    </select>
  );
}
