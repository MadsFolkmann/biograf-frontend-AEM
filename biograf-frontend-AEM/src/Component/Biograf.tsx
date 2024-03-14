import { useParams } from "react-router-dom";
import { getBiografer, Biograf } from "../services/apiFacade";
import { useEffect, useState } from "react";

export default function Biograf() {
  const { id } = useParams();
  console.log("id", id);

  const [biograf, setBiograf] = useState<Biograf | null>(null);
  useEffect(() => {
    getBiografer().then((res) => {
      const foundBiograf = res.find((bio) => bio.id === Number(id));
      setBiograf(foundBiograf);
    });
  }, [id]);

  return (
    <div>
      {biograf ? (
        <>
          <h2>{biograf.navn}</h2>
          <p>Address: {biograf.adresse}</p>
          <p>Number of Screens: {biograf.antalSale}</p>
          {/* Add additional information here */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
