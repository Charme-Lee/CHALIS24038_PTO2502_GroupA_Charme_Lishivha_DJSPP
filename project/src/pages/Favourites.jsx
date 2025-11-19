// import React, { useContext } from "react";
// import { FavouritesContext } from "../context/FavouritesContext";
// import EpisodeCard from "../components/Podcast/EpisodeCard"; // Card component for episode UI
// import styles from "./Favourites.module.css";

// export default function Favourites() {
//   const { favourites, sortFavourites } = useContext(FavouritesContext);
//   // DEBUG: inspect what's actually stored in favourites
//   console.log("Favourites from context:", favourites);

//   // Map episode object from favourites/context into structure EpisodeCard expects
//   // const mapEpisodeForCard = (ep) => ({
//   //   id: ep.id,
//   //   title: ep.title || "",
//   //   description: ep.description || "",
//   //   audio: ep.audio || ep.file || "",
//   //   season: ep.season || ep.seasonIndex || 1,
//   //   number: ep.number || ep.episode || 1,

//   //   showId: ep.showId,
//   //   showTitle: ep.show,
//   //   showImage: ep.showImage || null,

//   //   addedAt: ep.addedAt || null, // ← 🔥 THIS FIXES THE DATE
//   // });

//   const mapEpisodeForCard = (ep) => ({
//     id: ep.id,
//     title: ep.title || "",
//     description: ep.description || "",
//     src:
//       ep.audio || ep.audioUrl || ep.file || ep.enclosure?.url || ep.url || "", // 👈 MUST BE src
//     season: ep.season || ep.seasonIndex || 1,
//     number: ep.number || ep.episode || 1,
//     showId: ep.showId,
//     showTitle: ep.show,
//     showImage: ep.showImage || null,
//     addedAt: ep.addedAt || null,
//   });

//   // Group favourites by show
//   // const groupedFavourites = favourites.reduce((acc, fav) => {
//   //   const showTitle = fav.show;
//   //   acc[showTitle] = acc[showTitle] || [];
//   //   acc[showTitle].push(fav);
//   //   return acc;
//   // }, {});

//   // Group favourites by show, using the mapped shape EpisodeCard expects
//   const groupedFavourites = favourites.reduce((acc, fav) => {
//     const mapped = mapEpisodeForCard(fav);
//     const showTitle = mapped.showTitle || "Unknown Show";

//     acc[showTitle] = acc[showTitle] || [];
//     acc[showTitle].push(mapped);
//     return acc;
//   }, {});

//   return (
//     <div className={styles.container}>
//       {/* Header + Sort Dropdown */}
//       <div className={styles.top}>
//         <h1>Favourites</h1>
//         <select
//           className={styles.sortSelect}
//           onChange={(e) => sortFavourites(e.target.value)}
//           defaultValue="date-desc"
//         >
//           <option value="title-asc">A → Z</option>
//           <option value="title-desc">Z → A</option>
//           <option value="date-desc">Newest</option>
//           <option value="date-asc">Oldest</option>
//         </select>
//       </div>

//       {/* Render favourites grouped by show */}
//       {Object.entries(groupedFavourites).map(([showTitle, episodes]) => (
//         <section key={showTitle} className={styles.showGroup}>
//           <h2>
//             {showTitle} ({episodes.length} episode
//             {episodes.length > 1 ? "s" : ""})
//           </h2>

//           <ul className={styles.episodeList}>
//             {episodes.map((ep) => (
//               <EpisodeCard
//                 key={ep.id}
//                 episode={ep} // ep is already mapped above
//                 showTitle={ep.showTitle || ep.show}
//                 showImage={ep.showImage}
//                 hidePlayButton={false}
//               />
//             ))}
//           </ul>
//         </section>
//       ))}

//       {favourites.length === 0 && <p>No favourite shows yet!</p>}
//     </div>
//   );
// }
import React, { useContext, useState, useMemo } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import EpisodeCard from "../components/Podcast/EpisodeCard";
import styles from "./Favourites.module.css";

export default function Favourites() {
  const { favourites, sortFavourites } = useContext(FavouritesContext);

  const [showFilter, setShowFilter] = useState("all");

  // Map the favourites into the shape EpisodeCard expects
  const mapEpisodeForCard = (ep) => ({
    id: ep.id,
    title: ep.title || "",
    description: ep.description || "",
    src:
      ep.src || ep.audio || ep.audioUrl || ep.file || ep.enclosure?.url || "",
    season: ep.season || ep.seasonIndex || 1,
    number: ep.number || ep.episode || 1,
    showId: ep.showId,
    showTitle: ep.show,
    showImage: ep.showImage || null,
    addedAt: ep.addedAt || null,
  });

  // Group favourites by show (already mapped)
  const groupedFavourites = useMemo(() => {
    return favourites.reduce((acc, fav) => {
      const mapped = mapEpisodeForCard(fav);
      const showTitle = mapped.showTitle || "Unknown Show";

      if (!acc[showTitle]) acc[showTitle] = [];
      acc[showTitle].push(mapped);

      return acc;
    }, {});
  }, [favourites]);

  // All show names
  const allShows = Object.keys(groupedFavourites);

  // Apply show filter
  const filteredShowNames =
    showFilter === "all"
      ? allShows
      : allShows.filter((show) => show === showFilter);

  return (
    <div className={styles.container}>
      {/* Header + Sort + Show Filter */}
      <div className={styles.top}>
        <h1>Favourites</h1>

        <div className={styles.filtersRow}>
          {/* Sort Dropdown */}
          <select
            className={styles.sortSelect}
            onChange={(e) => sortFavourites(e.target.value)}
            defaultValue="date-desc"
          >
            <option value="title-asc">A → Z</option>
            <option value="title-desc">Z → A</option>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
          </select>

          {/* NEW: Show Filter */}
          <select
            className={styles.sortSelect}
            value={showFilter}
            onChange={(e) => setShowFilter(e.target.value)}
          >
            <option value="all">All Shows</option>
            {allShows.map((show) => (
              <option key={show} value={show}>
                {show}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render Groups */}
      {filteredShowNames.map((showTitle) => (
        <section key={showTitle} className={styles.showGroup}>
          <h2>
            {showTitle} ({groupedFavourites[showTitle].length} episode
            {groupedFavourites[showTitle].length > 1 ? "s" : ""})
          </h2>

          <ul className={styles.episodeList}>
            {groupedFavourites[showTitle].map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                showTitle={ep.showTitle}
                showImage={ep.showImage}
                hidePlayButton={false}
              />
            ))}
          </ul>
        </section>
      ))}

      {favourites.length === 0 && <p>No favourite shows yet!</p>}
    </div>
  );
}
