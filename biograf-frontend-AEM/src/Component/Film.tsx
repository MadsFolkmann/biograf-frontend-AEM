import React, { useState, useEffect } from "react";
import { getFilms } from "../services/apiFacade";
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
}

export const Film = () => {
  const [film, setFilm] = useState<Film[]>([]);
  const [sortMethod, setSortMethod] = useState<"alphabetic" | "duration">("alphabetic");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const auth = useAuth();

  useEffect(() => {
    getFilms().then((res) => setFilm(res));
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

  const filteredFilm = film.filter((item) => selectedGenre === "All" || item.genre === selectedGenre);

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

  return (
    <div className="film-container">
      <h2 className="film-header">Film</h2>
      {/* <p>Se Film.</p> */}
      <div className="filter-dropdown">
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="All">All</option>
          {/* Map over films and generate option elements */}
          {film.map((item, index) => (
            <option key={index} value={item.genre}>
              {item.genre}
            </option>
          ))}
        </select>
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
