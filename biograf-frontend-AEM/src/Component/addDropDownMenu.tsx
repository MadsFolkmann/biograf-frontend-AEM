// AddDropdownMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./AddDropdownMenu.css";

const AddDropdownMenu = () => {
  return (
    <li className="dropdown">
      <a href="#" className="dropbtn">
        Tilføj
      </a>
      <div className="dropdown-content">
        <NavLink to="/addBiograf">Tilføj Biograf</NavLink>
        <NavLink to="/addFilm">Tilføj Film</NavLink>
        <NavLink to="/addForestilling">Tilføj Forestilling</NavLink>
        <NavLink to="/addSal">Tilføj Sal</NavLink>
        {/* <NavLink to="/addSæde">Tilføj Sæde</NavLink> */}
      </div>
    </li>
  );
};

export default AddDropdownMenu;
