import React from "react";
import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import AddDropdownMenu from "./Component/addDropDownMenu";
import InfoDropdownMenu from "./Component/InfoDropdownMenu";

import { useAuth } from "./security/AuthProvider";

import "./NavHeader.css";

export default function NavHeader() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Hjem</NavLink>
        </li>
        <li>
          <NavLink to="/film">Film</NavLink>
        </li>

        <li>
          <NavLink to="/omOs">Om os</NavLink>
        </li>

        {auth.isLoggedIn() && auth.isLoggedInAs(["ADMIN"]) && (
          <>
            <AddDropdownMenu />
            <InfoDropdownMenu />
          </>
        )}
        <AuthStatus />
      </ul>
    </nav>
  );
}
