// InfoDropdownMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./InfoDropdownMenu.css";

const InfoDropdownMenu = () => {
  return (
    <div className="dropdown">
      <div className="dropbtn">Info</div>
      <div className="dropdown-content">
        {/* <NavLink to="/biograf">Biografer</NavLink>
        <NavLink to="/forestilling">Forestillinger</NavLink> */}
        <NavLink to="/sal">Sal Oversigt</NavLink>
        <NavLink to="/medlemmer">Medlems oversigt</NavLink>
      </div>
    </div>
  );
};

export default InfoDropdownMenu;
