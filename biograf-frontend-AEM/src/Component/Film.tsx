import React, { useState, useEffect } from "react";
import { getFilms, getBiografer, getForestillinger, Biograf } from "../services/apiFacade";
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

interface Forestilling {
  id: number;
  film: Film;
  biograf: { id: number; navn: string };
  tidspunkt: string;
}

export const Film = () => {
  const [film, setFilm] = useState<Film[]>([]);
  const [biografer, setBiografer] = useState<Biograf[]>([]);
  const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);
  const [sortMethod, setSortMethod] = useState<"alphabetic" | "duration">("alphabetic");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedBiografFilter, setSelectedBiografFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState("");
  const auth = useAuth();

  useEffect(() => {
    getFilms().then(setFilm);
    getBiografer().then(setBiografer);
    getForestillinger().then(setForestillinger);
  }, []);

  const handleBiografFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBiografFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split("-");
    setSortMethod(value[0] as "alphabetic" | "duration");
    setSortDirection(value[1] as "ASC" | "DESC");
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
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
    getFilms().then(setFilm);
  };

  const hasForestillinger = (filmId: number) => {
    return forestillinger.some((forestilling) => forestilling.film.id === filmId);
  };

  const hasForestillingerInBiograf = (filmId: number) => {
    if (selectedBiografFilter === "All") {
      return hasForestillinger(filmId);
    }
    return forestillinger.some((forestilling) => forestilling.film.id === filmId && forestilling.biograf.navn === selectedBiografFilter);
  };

  const filteredAndSortedFilm = film
    .filter(
      (item) => (selectedGenre === "All" || item.genre === selectedGenre) && (selectedBiografFilter === "All" || hasForestillingerInBiograf(item.id))
    )
    .sort((a, b) => {
      if (sortMethod === "alphabetic") {
        return sortDirection === "ASC" ? a.titel.localeCompare(b.titel) : b.titel.localeCompare(a.titel);
      }
      if (sortMethod === "duration") {
        return sortDirection === "ASC" ? a.varighed - b.varighed : b.varighed - a.varighed;
      }
      return 0;
    });

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
        <label htmlFor="biograf-filter">Vælg Biograf:</label>
        <select id="biograf-filter" value={selectedBiografFilter} onChange={handleBiografFilterChange}>
          <option value="All">Alle Biografer</option>
          {biografer.map((biograf) => (
            <option key={biograf.id} value={biograf.navn}>
              {biograf.navn}
            </option>
          ))}
        </select>
      </div>
      <div className="search-container">
        <input type="text" value={searchInput} onChange={handleSearchChange} placeholder="Søg film..." />
        <button onClick={handleSearch}>Søg</button>
        <button onClick={handleResetSearch}>Nulstil</button>
      </div>
      <div className="sort-dropdown">
        <label htmlFor="sort">Sortering:</label>
        <select id="sort" value={`${sortMethod}-${sortDirection}`} onChange={handleSortChange}>
          <option value="alphabetic-ASC">A-Z</option>
          <option value="alphabetic-DESC">Z-A</option>
          <option value="duration-ASC">Kortest først</option>
          <option value="duration-DESC">Længst først</option>
        </select>
      </div>
      <ul className="film-list">
        {filteredAndSortedFilm.map((item, index) => (
          <li key={index} className={`film-item ${!hasForestillingerInBiograf(item.id) ? "hidden" : ""}`}>
            <Link to={`/film/${item.id}`} className="film-link">
              <div className="film-item-content">
                <img src={item.billede} alt={item.titel} className="film-image" />
                <span>
                  {item.id} - {item.titel} - {item.er3D ? "3D" : "2D"}
                  <span
                    className={`forestilling-indikator ${hasForestillingerInBiograf(item.id) ? "forestilling-tilgængelig" : "ingen-forestilling"}`}
                    data-tooltip={hasForestillingerInBiograf(item.id) ? "Forestilling tilgængelige" : "Ingen forestilling tilgængelige"}
                  ></span>{" "}
                </span>
              </div>
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to={`/editFilm/${item.id}`} className="film-edit">
                Rediger
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
