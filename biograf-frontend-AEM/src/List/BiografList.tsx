import { Link, useSearchParams } from "react-router-dom";
import "../Form/BiografForm.css";
import { useEffect, useState } from "react";
import { Biograf as APIBiograf, getBiografer } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";

export default function BiografList() {
  const [queryString] = useSearchParams();
  const initialBiograf = queryString.get("biograf");
  const [biografer, setBiografer] = useState<Array<APIBiograf>>([]);
  const [error, setError] = useState("");
  const auth = useAuth();

  useEffect(() => {
    getBiografer()
      .then((res) => setBiografer(res))
      .catch(() => setError("Error fetching biografer, is the server running?"));
  }, [initialBiograf]);

  const biografListItems = biografer
    ? biografer.map((biograf) => (
        <li key={biograf.id}>
          <Link to={`${biograf.id}`}>{biograf.navn}</Link>,
          {auth.isLoggedInAs(["ADMIN", "USER"]) && (
            <Link className="recipe-btn" to="/addBiograf" state={biograf}>
              Edit{" "}
            </Link>
          )}
        </li>
      ))
    : null;

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }
  return (
    <>
      <h3>Biografer</h3>
      {biografer && (
        <div>
          Biograf with '{biografer}'{" "}
          <button
            onClick={() => {
              setBiografer(null);
              getBiografer(null).then((res) => setBiografer(res));
            }}
          >
            Clear
          </button>
        </div>
      )}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>{biografListItems}</ul>
    </>
  );
}
