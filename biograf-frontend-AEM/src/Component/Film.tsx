import React, { useState, useEffect } from "react";
import { getFilms, getBiografer, Biograf, getForestillinger, Forestilling } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import "./Film.css";

interface Film {
  id: number;
  titel: string;
  varighed: number;
  genre: string;
  billede: string;
  er3D: boolean;
  filmBeskrivelse: string;
  filmSprog: string;
  biograf: string;
}

export const Film = () => {
  const [film, setFilm] = useState<Film[]>([]);
  const [biografer, setBiografer] = useState<Biograf[]>([]);
  const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);

  const [sortMethod, setSortMethod] = useState<"alphabetic" | "duration">("alphabetic");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedBiograf, setSelectedBiograf] = useState<string>("All");
  const [searchInput, setSearchInput] = useState("");

  const auth = useAuth();

  useEffect(() => {
    getFilms().then((res) => setFilm(res));
    getBiografer().then((res) => setBiografer(res));
    getForestillinger().then((res) => setForestillinger(res));
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "alphabetic-asc") {
      setSortMethod("alphabetic");
      setSortDirection("ASC");
    } else if (value === "alphabetic-desc") {
      setSortMethod("alphabetic");
      setSortDirection("DESC");
    } else if (value === "duration-longest") {
      setSortMethod("duration");
      setSortDirection("DESC");
    } else if (value === "duration-shortest") {
      setSortMethod("duration");
      setSortDirection("ASC");
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleBiografChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBiografName = e.target.value;
    setSelectedBiograf(selectedBiografName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const search = searchInput.toLowerCase();
    const filtered = film.filter((item) => item.titel.toLowerCase().includes(search));
    setFilm(filtered);
  };

  const handleResetSearch = () => {
    setSearchInput("");
    getFilms().then((res) => setFilm(res));
  };

  const filteredFilm = film.filter(
    (item) => (selectedGenre === "All" || item.genre === selectedGenre) && (selectedBiograf === "All" || item.biograf === selectedBiograf)
  );

  const sortedFilm = filteredFilm.slice().sort((a, b) => {
    if (sortMethod === "alphabetic") {
      if (sortDirection === "ASC") {
        return a.titel.localeCompare(b.titel);
      } else {
        return b.titel.localeCompare(a.titel);
      }
    } else if (sortMethod === "duration") {
      if (sortDirection === "ASC") {
        return a.varighed - b.varighed;
      } else {
        return b.varighed - a.varighed;
      }
    }
  });

  // Filtrer forestillinger baseret på den valgte biograf
  const filteredForestillinger = forestillinger.filter(
    (forestilling) => selectedBiograf === "All" || (forestilling.biograf && forestilling.biograf.navn === selectedBiograf)
  );

  return (
    <div className="film-container">
      <h2 className="film-header">Film</h2>
      <div className="filter-dropdown">
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="All">All</option>
          {Array.from(new Set(film.map((item) => item.genre))).map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-dropdown">
        <label htmlFor="biograf">Biograf:</label>
        <select id="biograf" value={selectedBiograf} onChange={handleBiografChange}>
          <option value="All">All</option>
          {filteredForestillinger.map((forestilling) => (
            <option key={forestilling.biograf?.id} value={forestilling.biograf?.navn}>
              {forestilling.biograf?.navn}
            </option>
          ))}
        </select>
      </div>
      <div className="search-container">
        <input type="text" value={searchInput} onChange={handleSearchChange} placeholder="Søg film..." />
        <button onClick={handleSearch}>Søg</button>
        <button onClick={handleResetSearch}>Tilbage</button>
      </div>
      <div className="sort-dropdown">
        <label htmlFor="sort">Sortering:</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="alphabetic-asc">A-Z</option>
          <option value="alphabetic-desc">Z-A</option>
          <option value="duration-longest">Længst</option>
          <option value="duration-shortest">Kortest</option>
        </select>
      </div>
      <ul className="film-list">
        {sortedFilm.map((item, index) => (
          <li key={index} className="film-item">
            <Link to={`/film/${item.id}`} className="film-link">
              <div className="film-item-content">
                <img src={item.billede} alt={item.titel} className="film-image" />
                <span>
                  {item.id} - {item.titel} - Varighed: {item.varighed}
                </span>
              </div>
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to="/addFilm" state={item} className="film-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
``;
