import { useEffect, useState } from "react";
import { getInfo, Info } from "./services/apiFacade";

export default function Home() {
  const [info, setInfo] = useState<Info | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    setErr("");
    getInfo()
      .then((data) => setInfo(data))
      .catch(() => {
        setErr("Error fetching info from backend");
      });
  }, []);

  return (
    <>
      {/* <img style={{ width: 200 }} src="https://vectorportal.com/storage/ames_3603.jpg" alt="logo" /> */}

      <h2>AEM Biograf</h2>
      <p>Velkommen til AEM'S Biograf</p>
      <p>Vi har nordens bedste udvalg af film hernede!</p>
    </>
  );
}
