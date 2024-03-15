// InfoDropdownMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./InfoDropdownMenu.css";

const InfoDropdownMenu = () => {
  return (
    <div className="dropdown">
      <div className="dropbtn">Info</div>
      <div className="dropdown-content">
        <NavLink to="/sal">Sal Oversigt</NavLink>
        <NavLink to="/sæde">Sæde Oversigt</NavLink>
        <NavLink to="/addSal">Tilføj Sal</NavLink>
        <NavLink to="/addSæde">Tilføj Sæde</NavLink>
      </div>
    </div>
  );
};

export default InfoDropdownMenu;
