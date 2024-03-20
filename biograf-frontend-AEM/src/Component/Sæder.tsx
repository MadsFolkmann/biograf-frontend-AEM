import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getForestilling, Forestilling } from "../services/apiFacade";
import Cinema from "./Cinema";
import './Sæder.css';


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

 const tidspunkt = new Date(forestilling?.tidspunkt);
 const formattedTidspunkt = `${tidspunkt.toLocaleDateString("da-DK")} kl. ${tidspunkt.toLocaleTimeString("da-DK", {
     hour: "2-digit",
     minute: "2-digit",
 })}`;
    
    return (
        <div className="App">
            {forestilling.film?.billede && <img className="filmImage" src={forestilling.film.billede} alt={forestilling.film.titel} />}
            <div className="infoBar">
                <span>Sal: {forestilling.sal?.nummer}</span>
                <span>Tidspunkt: {formattedTidspunkt}</span>
                <span>Biograf: {forestilling.biograf?.navn}</span>
                <span>Film: {forestilling.film?.titel}</span>
            </div>
            <Cinema
                forestilling={forestilling}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)}
            />
            <div className="info">
                <p className="selected-info">
                    You have selected <span className="count">{selectedSeats.length}</span> seats
                </p>
                {selectedSeats.map((sæde, index) => (
                    <div key={index} className="selectedSeat">
                        Sæde type: <span>{sæde.sædeType}</span>, Sæde nummer: <span>{sæde.sædeNummer}</span>, Række: <span>{sæde.række}</span>, Pris:{" "}
                        <span>{sæde.pris}</span>
                    </div>
                ))}
            </div>
            <Link to="/bestilling" state={{ selectedSeats: selectedSeats, forestilling: forestilling }} className="videre-til-bestiling-button">
                <button className="videre-til-bestiling-button" disabled={selectedSeats.length === 0}>
                    Videre til bestilling
                </button>
            </Link>
        </div>
    );
}


