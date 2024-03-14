import { useState, useEffect } from "react";
import { getBiografer } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";

interface Biograf {
  id: number;
  navn: string;
  adresse: string;
  antalSale: number;
}

export const Biograf = () => {
  const [biografer, setBiografer] = useState<Biograf[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getBiografer().then((res) => setBiografer(res));
  }, []);

  return (
    <>
      <h2>Biografer</h2>
      <p>Se Biografer.</p>

      <ul>
        {biografer.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.id}`}>{item.navn}</Link>
            {item}
            {auth.isLoggedInAs(["ADMIN", "USER"]) && (
              <Link className="recipe-btn" to="/addBiograf" state={item}>
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
