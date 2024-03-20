import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getMedlemmer } from "../services/apiFacade";
import "./Medlemmer.css";

interface Medlemmer {
  id: number;
  username: string;
  email: string;
  roleNames: string[];
}

const Medlemmer: React.FC = () => {
  const [medlemmer, setMedlemmer] = useState<Medlemmer[]>([]);
  const [filteredMedlemmer, setFilteredMedlemmer] = useState<Medlemmer[]>([]);
  const [filter, setFilter] = useState<string>("all"); // Default filter: vis alle

  useEffect(() => {
    getMedlemmer().then((res) => {
      console.log("Medlemmer data:", res);
      setMedlemmer(res);
      setFilteredMedlemmer(res); // Start med at vise alle brugere
    });
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setFilteredMedlemmer(medlemmer); // Vis alle brugere
    } else {
      const filtered = medlemmer.filter((user) => (newFilter === "users" ? user.roleNames.includes("USER") : user.roleNames.includes("ADMIN")));
      setFilteredMedlemmer(filtered);
    }
  };

  return (
    <div className="medlemmer-container">
      <h2 className="medlemmer-header">Medlemmer</h2>
      <div className="filter-dropdown">
        <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="all">Alle</option>
          <option value="users">Brugere</option>
          <option value="admins">Admins</option>
        </select>
      </div>
      <ul className="medlemmer-list">
        {filteredMedlemmer.map((item, index) => (
          <li key={index} className="medlemmer-item">
            <div>
              <span>Brugernavn: {item.username}</span>
            </div>
            <div>
              <span>Email: {item.email}</span>
            </div>
            <div>
              <span>Roller: {item.roleNames.join(", ")}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medlemmer;
