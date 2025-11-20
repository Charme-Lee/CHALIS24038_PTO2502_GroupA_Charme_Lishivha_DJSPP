import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Header.module.css";
import headerImg from "../../assets/image.png";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={styles.appHeader}
      style={{
        backgroundColor: theme === "dark" ? "#504f51ff" : "#f5f5f5",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
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
        <img
          src={headerImg}
          alt="Profile photo"
          className={styles.headerImage}
        />
      </nav>
    </header>
  );
}
