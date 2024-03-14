import React from "react";
import { useState, useEffect } from "react";
import { getFilms } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import "./Biograf.css";

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
    <div className="biograf-container">
      <h2 className="biograf-header">Film</h2>
      <p>Se Film.</p>

      <ul className="biograf-list">
        {film.map((item, index) => (
          <li key={index} className="biograf-item">
            <Link to={`/${item.id}`} className="biograf-link">
              {item.id} - {item.titel}
            </Link>
            {auth.isLoggedInAs(["ADMIN", "USER"]) && (
              <Link to="/addFilm" state={item} className="biograf-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
