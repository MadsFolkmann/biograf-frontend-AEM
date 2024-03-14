import { Link, useSearchParams } from "react-router-dom";
import "./RecipesLayout.css";
import { useEffect, useState } from "react";
import { Biograf as ApiBiograf, getBiografer } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";


export default function BiografList = () {
const [queryString] = useSearchParams();
const initialBiograf = queryString.get("biograf");
const [biografer, setBiografer] = useState<ApiBiograf[]>();
const [error, setError] = useState("");
  const auth = useAuth();

  useEffect(() => {
    getBiografer(biograf)
      .then((res) => setBiografer(res))
      .catch(() => setError("Error fetching biografer, is the server running?"));
  }, [biograf]);


  const biografListItems = biografer.map((biograf) => {
    return (
      <li key={biograf.id}>
        <Link to={`${biograf.id}`}>{biograf.navn}</Link>,
        {auth.isLoggedInAs(["ADMIN", "USER"]) && (
          <Link className="recipe-btn" to="/addBiograf" state={biograf}>
            Edit{" "}
          </Link>
        )}
      </li>
    );
  });

    if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }
  return (
    <>
      <h3>Biografer</h3>
      {biograf && (
        <div>
          Biograf with '{biograf}'{" "}
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