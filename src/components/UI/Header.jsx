import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.appHeader}>
      {/* App title */}
      <div>
        <Link to="/" className={styles.logo}>
          🎙️ Podcast App
        </Link>
      </div>

      {/* Navigation links */}
      <nav className={styles.navLinks}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>
        <Link to="/favourites" className={styles.favsLink}>
          ❤️
        </Link>
        {/* Theme toggle button */}
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "dark" ? "🌞" : "🌚"}
        </button>
        <img className={styles.headerImage} src="./image.png" />
      </nav>
    </header>
  );
}
