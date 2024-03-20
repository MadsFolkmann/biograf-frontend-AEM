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
        {films.slice(0, 3).map((film, index) => (
          <div key={index} className="film-item">
            <img src={film.billede} alt={film.titel} className="film-image" />
            <p className="film-title">{film.titel}</p>
            <p className="film-description">{film.filmBeskrivelse}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer class="biograf-footer">
        <div class="footer-social-media">
          <div class="footer-attribution">Made by @AEM</div>

          <ul>
            <li>
              <a href="#Facebook">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/023/986/999/non_2x/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png"
                  alt="Facebook logo"
                  class="footer-social-media-logo"
                />
              </a>
            </li>
            <li>
              <a href="#Twitter">
                <img
                  src="https://seeklogo.com/images/T/twitter-x-logo-0339F999CF-seeklogo.com.png?v=638264860180000000"
                  alt="Facebook logo"
                  class="footer-social-media-logo"
                />
              </a>
            </li>
            <li>
              <a href="#instagram">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png?20200512141346"
                  alt="Facebook logo"
                  class="footer-social-media-logo"
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
