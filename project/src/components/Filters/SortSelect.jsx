import { useContext } from "react";
import { SORT_OPTIONS, PodcastContext } from "../../context/PodcastContext";
import styles from "./SortSelect.module.css";

/**
 *This component renders a sorting dropdown menu for podcasts.
It uses useContext to connect to PodcastContext, where it retrieves and updates the global sortKey value. When 
the user selects a new sort option, it updates the context, causing any components dependent on sort order to re-render with the new sorting.
 */

/**
 * @function SortSelect
 * @description
 * A dropdown component that allows users to select how podcasts are sorted
 * (e.g., by title, date, or other defined criteria). It uses React context
 * to read and update the global sorting key.
 *
 * @returns {JSX.Element} A styled <select> element listing available sort options.
 *
 * @example
 * <SortSelect />
 */
export default function SortSelect() {
  // Retrieve current sort key and its updater function from context
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    // Render a dropdown menu for sorting podcasts
    <select
      className={styles.select} // Apply CSS module styling
      value={sortKey} // Controlled select bound to context value
      onChange={(e) => setSortKey(e.target.value)} // Update sort key in context when changed
    >
      {/* Dynamically generate dropdown options from SORT_OPTIONS */}
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
