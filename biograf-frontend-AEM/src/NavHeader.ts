import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";
import { NavLink } from "react-router-dom";

export default function NavHeader() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/biograf">Biografer</NavLink>
        </li>
        {auth.isLoggedIn() && (
          <li>
            <NavLink to="/addBiograf">Tilføj Biograf</NavLink>
          </li>
        )}
        <AuthStatus />
      </ul>
    </nav>
  );
}
