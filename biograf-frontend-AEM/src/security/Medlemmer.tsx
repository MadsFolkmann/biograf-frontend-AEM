import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getMedlemmer } from "../services/apiFacade";

interface Medlemmer {
  id: number;
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  created: string;
}

const Medlemmer: React.FC = () => {
  const [medlemmer, setMedlemmer] = useState<Medlemmer[]>([]);
  const auth = useAuth();

  useEffect(() => {
    getMedlemmer().then((res) => {
      console.log("Medlemmer data:", res); // Log dataene her
      setMedlemmer(res);
    });
  }, []);

  return (
    <div className="medlemmer-container">
      <h2 className="medlemmer-header">Medlemmer</h2>
      <p>Se medlemmer.</p>

      <ul className="medlemmer-list">
        {medlemmer.map((item, index) => (
          <li key={index} className="medlemmer-item">
            <Link to={`/${item.id}`} className="medlemmer-link">
              {item.id} - {item.username}
            </Link>
            {auth.isLoggedInAs(["ADMIN"]) && (
              <Link to="/addMedlem" state={item} className="medlemmer-edit">
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medlemmer;
