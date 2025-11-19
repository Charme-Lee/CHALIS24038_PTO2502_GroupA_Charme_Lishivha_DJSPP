import React, { useContext, useEffect, useRef } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Link } from "react-router-dom";
import GenreTags from "./UI/GenreTags";
import styles from "./carousel.module.css";

export default function RecommendedCarousel() {
  const { allPodcasts } = useContext(PodcastContext);
  const carouselRef = useRef(null);

  // Triple list trick
  const looped = [...allPodcasts, ...allPodcasts, ...allPodcasts];

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / 3;
    container.scrollLeft = itemWidth; // Start in middle

    const handleScroll = () => {
      const max = itemWidth * 1.5;
      const min = itemWidth * 0.5;

      // When scrolling normally, do nothing
      if (container.scrollLeft > min && container.scrollLeft < max) return;

      // Instantly move back into the middle list (no animation)
      container.style.scrollBehavior = "auto";

      if (container.scrollLeft <= min) {
        container.scrollLeft += itemWidth;
      } else if (container.scrollLeft >= max) {
        container.scrollLeft -= itemWidth;
      }

      // Re-enable smooth scrolling
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "smooth";
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [allPodcasts]);

  const scroll = (dir) => {
    const container = carouselRef.current;
    const item = container.querySelector(`.${styles.carouselItem}`);
    if (!item) return;

    const amount = dir === "left" ? -item.offsetWidth : item.offsetWidth;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselContainer}>
      <h2>🔥 Recommended For You</h2>

      <button className={styles.arrow} onClick={() => scroll("left")}>
        ←
      </button>

      <div className={styles.carousel} ref={carouselRef}>
        {looped.map((podcast, index) => (
          <Link
            key={`${podcast.id}-${index}`}
            to={`/show/${podcast.id}`}
            className={styles.carouselItem}
          >
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <GenreTags genres={podcast.genres} />
          </Link>
        ))}
      </div>

      <button className={styles.arrow} onClick={() => scroll("right")}>
        →
      </button>
    </div>
  );
}
