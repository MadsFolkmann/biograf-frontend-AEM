import React, { useState, useEffect } from "react";
import { getBiografer } from "../services/apiFacade";
import "./OmOs.css";

interface Biograf {
  id: number;
  navn: string;
  adresse: string;
  telefon: string;
}

const OmOs: React.FC = () => {
  const [biografer, setBiografer] = useState<Biograf[]>([]);

  useEffect(() => {
    getBiografer().then((res) => setBiografer(res));
  }, []);

  return (
    <div className="om-os-container">
      <h2>Om Os</h2>
      <p>
        Træd ind i vores verden af filmoplevelser og fællesskab. Vi byder dig hjerteligt velkommen til vores biografer, hvor magien ved film møder den
        autentiske biografstemning.
      </p>
      <div className="biografer">
        {biografer.map((biograf) => (
          <div key={biograf.id} className="biograf">
            <h3>{biograf.navn}</h3>
            <p>Adresse: {biograf.adresse}</p>
            <p>Telefon: 28 00 00 00 {biograf.telefon}</p>
            <p>Antal sale: {biograf.antalSale}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OmOs;
