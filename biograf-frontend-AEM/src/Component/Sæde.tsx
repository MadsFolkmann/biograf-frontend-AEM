import React from "react";
import { useState, useEffect } from "react";
import { getSæder } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";

interface Sæde {
  id: number;
  række: number;
  sædeNummer: number;
  sædeType: string;
  pris: number;
  optaget: boolean;
}

export const Sæde = () => {
  const [sæder, setSæder] = useState<Sæde[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getSæder().then((res) => setSæder(res));
  }, []);

  return (
    <div className="sæde-container">
      <h2 className="sæde-header">Sæder</h2>
      <p>Se sæder.</p>

      <ul className="sæde-list">
        {sæder.map((item, index) => (
          <li key={index} className="sæde-item">
            <Link to={`/${item.id}`} className="sæde-link">
              <li>
                {item.id} - {item.række}
              </li>
              <li>{item.sædeNummer}</li>
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to="/addSæde" state={item} className="sæde-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
