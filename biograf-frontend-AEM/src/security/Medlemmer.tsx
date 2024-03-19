import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getMedlemmer } from "../services/apiFacade";

interface Medlem {
  id: number;
  navn: string;
}

const MedlemmerListe = () => {
  const [medlemmer, setMedlemmer] = useState<Medlem[]>([]);

  useEffect(() => {
    fetchMedlemmer();
  }, []);

  const fetchMedlemmer = async () => {
    try {
      const data = await getMedlemmer();
      setMedlemmer(data);
    } catch (error) {
      console.error("Error fetching medlemmer:", error);
    }
  };

  return (
    <div>
      <h1>Medlemmer</h1>
      <ul>
        {medlemmer.map((medlem) => (
          <li key={medlem.id}>
            <Link to={`/medlem/${medlem.id}`}>{medlem.navn}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedlemmerListe;
