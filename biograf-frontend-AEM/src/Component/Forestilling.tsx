import React from "react";
import { useState, useEffect } from "react";
import { getForestillinger } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import "./Forestilling.css"; // Opdateret CSS-filnavn

interface Forestilling {
  id: number;
  film: string;
  biograf: string;
  sal: number;
  sæde: number;
  tidspunkt: string;
}

export const Forestilling = () => {
  const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getForestillinger().then((res) => setForestillinger(res));
  }, []);

  return (
    <div className="forestilling-container">
      <h2 className="forestilling-header">Forestillinger</h2>
      <p>Se forestillinger.</p>

      <ul className="forestilling-list">
        {forestillinger.map((item, index) => (
          <li key={index} className="forestilling-item">
            <Link to={`/${item.id}`} className="forestilling-link">
              <li>
                Film: {item.id} - {item.film.titel}
              </li>
              <li> Biograf: {item.biograf.navn}</li>
              <li>Saltype: {item.sal.salType}</li>
              Tidspunkt: {item.tidspunkt}
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to="/addForestilling" state={item} className="forestilling-edit">
                <button className="forestilling-edit"> Edit</button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
