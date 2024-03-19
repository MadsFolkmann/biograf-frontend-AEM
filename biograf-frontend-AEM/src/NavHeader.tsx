import React from "react";
import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import AddDropdownMenu from "./Component/addDropDownMenu";
import InfoDropdownMenu from "./Component/InfoDropdownMenu";

import { useAuth } from "./security/AuthProvider";

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
          {" "}
          <InfoDropdownMenu />
        </li>

        {auth.isLoggedIn() && auth.isLoggedInAs(["ADMIN"]) && <AddDropdownMenu />}
        <AuthStatus />
      </ul>
    </nav>
  );
}
