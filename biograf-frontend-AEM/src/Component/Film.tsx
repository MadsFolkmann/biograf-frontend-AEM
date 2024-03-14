import React from "react";
import { useState, useEffect } from "react";
import { getFilms } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import "./Film.css"; // Opdateret CSS-filnavn

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
  const auth = useAuth();

  useEffect(() => {
    getFilms().then((res) => setFilm(res));
  }, []);

  return (
    <div className="film-container">
      {" "}
      {/* Opdateret klassenavn */}
      <h2 className="film-header">Film</h2> {/* Opdateret klassenavn */}
      <p>Se Film.</p>
      <ul className="film-list">
        {" "}
        {/* Opdateret klassenavn */}
        {film.map((item, index) => (
          <li key={index} className="film-item">
            {" "}
            {/* Opdateret klassenavn */}
            <Link to={`/${item.id}`} className="film-link">
              {" "}
              {/* Opdateret klassenavn */}
              <div className="film-item-content">
                {" "}
                {/* Opdateret klassenavn */}
                <img src={item.billede} alt={item.titel} className="film-image" /> {/* Opdateret klassenavn */}
                <span>
                  {item.id} - {item.titel}
                </span>
              </div>
            </Link>
            {auth.isLoggedInAs(["ADMIN", "USER"]) && (
              <Link to="/addFilm" state={item} className="film-edit">
                {" "}
                {/* Opdateret klassenavn */}
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
