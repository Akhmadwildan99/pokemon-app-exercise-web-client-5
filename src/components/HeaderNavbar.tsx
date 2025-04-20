import React, { useState, useRef, useEffect } from "react";
import "./HeaderNavbar.scss";
import logoPokemon from "../assets/pokemon-logo-white.png";
import { Link } from "react-router-dom";

interface HeaderNavbarProps {
  isHome: boolean;
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ isHome }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible && searchInputRef.current) {
      // Fokus ke input saat form muncul
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  // Tutup form jika klik di luar input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchVisible &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchVisible]);

  return (
    <header className="header-navbar">
      <div className="logo">
        {/* Logo Pokémon bisa pakai gambar atau SVG */}
        <Link to={"/"}>
            <img src={logoPokemon} alt="Pokémon Logo" className="logo-image" />
        </Link>
       
      </div>
      <div className={`search-container `} style={{ display: isHome ? "block" : "none" }}>
        {isSearchVisible ? (
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        ) : (
          <button
            className="search-button"
            onClick={toggleSearch}
            aria-label="Open Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx={11} cy={11} r={7} />
              <line x1={21} y1={21} x2={16.65} y2={16.65} />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderNavbar;
// HeaderNavbar.tsx
// HeaderNavbar.tsx
