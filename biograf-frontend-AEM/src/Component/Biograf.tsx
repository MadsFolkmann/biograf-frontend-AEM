import React, { useState, useEffect } from "react";
import { getBiografer } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";

export const Biograf = () => {
  const [biografer, setBiografer] = useState<Biograf[]>();
  const auth = useAuth();

  useEffect(() => {
    getBiografer().then((res) => setBiografer(res));
  }, []);

  return (
    <div>
      <h1>Biografer</h1>
      <p>Her er en liste over biografer</p>
      <ul>
        {biografer.map((biograf) => (
          <li key={biograf.id}>
            <Link to={`/${biograf.id}`}>{biograf.navn}</Link>
            {auth.isLoggedInAs(["ADMIN", "USER"]) && (
              <Link className="recipe-btn" to={`/editBiograf/${biograf.id}`}>
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Biograf {
  id: number | null;
  name: string;
}
