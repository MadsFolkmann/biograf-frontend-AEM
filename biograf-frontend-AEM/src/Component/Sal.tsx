import React from "react";
import { useState, useEffect } from "react";
import { getSale } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
// import "./Sal.css"; // Opdateret CSS-filnavn

interface Sal {
  id: number;
  biograf: string;
  antalSæder: number;
  antalSæderRække: number;
  salType: string;
}

export const Sal = () => {
  const [sale, setSale] = useState<Sal[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getSale().then((res) => setSale(res));
  }, []);

  return (
    <div className="sal-container">
      <h2 className="sal-header">Sale</h2>
      <p>Se sale.</p>

      <ul className="sal-list">
        {sale.map((item, index) => (
          <li key={index} className="sal-item">
            <Link to={`/${item.id}`} className="sal-link">
              <li>
                {item.id} - {item.biograf}
              </li>
              <li>{item.antalSæder}</li>
            </Link>
            {auth.isLoggedInAs(["ADMIN", "USER"]) && (
              <Link to="/addSal" state={item} className="sal-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
