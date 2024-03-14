import React from "react";
import { useEffect, useState } from "react";
import { getFilms, Film } from "./services/apiFacade";
import "./home.css";

export default function Home() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    getFilms().then((res) => setFilms(res));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-header">AEM Biograf</h2>
      {/* <img src="https://www.aem.dk/wp-content/uploads/2021/08/AEM-Logo-2021-1.png" alt="AEM Biograf" className="home-image" /> */}
      <p className="home-text">Velkommen til AEM's Biograf, hvor filmoplevelserne er i centrum!</p>
      <p className="home-text">Hos os finder du nordens bedste udvalg af film, der er sikker på at tilfredsstille enhver smag og præference.</p>
      <p className="home-text">Uanset om du er til action, drama, romantik eller science fiction, er der noget for enhver smag her hos os.</p>
      <h3 className="home-subheader">Nogle af vores populære film:</h3>
      <div className="film-list">
        {films.map((film, index) => (
          <div key={index} className="film-item">
            <img src={film.billede} alt={film.titel} className="film-image" />
            <p className="film-title">{film.titel}</p>
            <p className="film-description">{film.filmBeskrivelse}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
