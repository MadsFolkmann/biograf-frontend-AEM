import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getBiografer } from "../services/apiFacade";
import "./Biograf.css";

interface Biograf {
  id: number;
  navn: string;
  adresse: string;
  antalSale: number;
}

const Biograf: React.FC = () => {
  const [biografer, setBiografer] = useState<Biograf[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getBiografer().then((res) => setBiografer(res));
  }, []);

  return (
    <div className="biograf-container">
      <h2 className="biograf-header">Biografer</h2>
      <p>Se Biografer.</p>

      <ul className="biograf-list">
        {biografer.map((item, index) => (
          <li key={index} className="biograf-item">
            <Link to={`/${item.id}`} className="biograf-link">
              {item.id} - {item.navn}
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to="/addBiograf" state={item} className="biograf-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Biograf;
