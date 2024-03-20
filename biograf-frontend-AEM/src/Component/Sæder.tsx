import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getForestilling, Forestilling } from "../services/apiFacade";
import Cinema from "./Cinema";


export default function Sæder() {
    const { id } = useParams();
    console.log("id", id);
    const [forestilling, setForestilling] = useState<Forestilling | null>(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(() => {
        getForestilling(Number(id)).then((res) => setForestilling(res));
    }, [id]);

    if (!forestilling) {
        return <div>Loading...</div>;
    }

    console.log("forestilling", forestilling);
    console.log(selectedSeats);
    
    return (
        <div className="App">
          <h3>Sal: {forestilling.sal?.nummer}</h3>
          <h4>Tidspunkt: {forestilling?.tidspunkt}</h4>
          <h4>Biograf: {forestilling.biograf?.navn}</h4>
          <h4>Film: {forestilling.film?.titel}</h4>
          <Cinema
            forestilling={forestilling}
            selectedSeats={selectedSeats}
            onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
          />
          <p className="info">
            You have selected <span className="count">{selectedSeats.length}</span> seats
          </p>
        </div>
    );
}


