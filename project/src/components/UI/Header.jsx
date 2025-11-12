import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.appHeader}>
      <div>
        <Link to="/">🎙️ Podcast App</Link>
      </div>
      <div>
        <Link to="/favourites" className={styles.favouritesLink}>
          Favourites
        </Link>
      </div>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === "dark" ? "🌞" : "🌚"}
      </button>
    </header>
  );
}
