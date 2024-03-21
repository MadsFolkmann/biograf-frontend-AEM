import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bestilling, addBestilling } from "../services/apiFacade";
import "./BestillingForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMPTY_BESTILLING: Bestilling = {
    id: 0,
    navn: "",
    email: "",
    forestilling: null,
    sæder: [],
    pristotal: 0,
    reservationstidspunkt: "",
    betalt: false,
};
    


export default function BestillingForm() {
    const { selectedSeats, forestilling } = useLocation().state || { selectedSeats: null, forestilling: null };
    const [formData, setFormData] = useState({ navn: "", email: "" });
    const [pris, setPris] = useState(0);
    const [prisBesked, setPrisBesked] = useState("");
    const navigate = useNavigate();

    const beregnPris = () => {
        let pristotal = selectedSeats.reduce((total, sæde) => total + sæde.pris, 0);
        let besked = "";

        // Ekstra gebyr for lange film og 3D film
        if (forestilling?.film?.varighed > 170) {
            pristotal += 20; 
            besked += "Der er tilføjet et ekstra gebyr for lange film. ";
        }
        if (forestilling?.film?.er3D === true) {
            pristotal += 10; 
            besked += "Der er tilføjet et ekstra gebyr for 3D film. ";
        }

        // ekstra gebyr eller rabat for små og store ordrer
        if (selectedSeats.length <= 5) {
            pristotal += 15; // Alle ordrer under 5 sæder får et ekstra gebyr på 15 kr
            besked += "Der er tilføjet et ekstra gebyr for 5 billeter eller mindre bestilt. ";
        } else if (selectedSeats.length > 10) {
            pristotal *= 0.93; //  7% rabat for store ordrer
            besked += "Der er tilføjet en rabat for over 5 billeter bestilt. ";
        }

        setPris(pristotal);
        setPrisBesked(besked);
    };

    useEffect(() => {
        beregnPris();
    }, [selectedSeats, forestilling]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const newBestilling: Bestilling = {
                ...EMPTY_BESTILLING,
                navn: formData.navn,
                email: formData.email,
                forestilling: forestilling,
                sæder: selectedSeats,
                pristotal: pris,
                reservationstidspunkt: new Date().toISOString(),
                betalt: true,
            };
            const addedBestilling = await addBestilling(newBestilling);
            if (addedBestilling) {
                toast.success("Bestillingen er gennemført");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Error adding bestilling", error);
        }
    };
  

    console.log("selectedSeats", selectedSeats);
    console.log("forestilling", forestilling);

    return (
        <div>
            <h1>Bestilling</h1>
            <p>Her kan du se din bestilling</p>
            <p>Forestilling: {forestilling?.film?.titel}</p>
            <p>Sal: {forestilling?.sal?.nummer}</p>
            <p>Tidspunkt: {forestilling?.tidspunkt}</p>
            <p>Biograf: {forestilling?.biograf?.navn}</p>
            <p>Valgte sæder: {selectedSeats?.map((sæde) => `|Række ${sæde.række} Sæde ${sæde.sædeNummer}|`).join("\n")}</p>
            <p>
                Pris: {pris.toFixed(2)},-
                <span className="prisBesked"> {prisBesked}</span>
            </p>
            <input type="text" placeholder="Navn" value={formData.navn} onChange={handleChange} className="input" name="navn" required />
            <input type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" name="email" required />
            <button onClick={handleSubmit} disabled={!formData.navn || !formData.email} className="bekræft-button">
                Bekræft bestilling
            </button>
            <ToastContainer />
        </div>
    );
}
