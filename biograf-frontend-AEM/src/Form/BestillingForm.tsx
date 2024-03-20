import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bestilling, addBestilling } from "../services/apiFacade";
import "./BestillingForm.css";

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
    const [bestilling, setBestilling] = useState<Bestilling | null>(null);
    const [formData, setFormData] = useState({ navn: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const updatedSeats = selectedSeats.map((sæde) => ({ ...sæde, optaget: true }));
            const newBestilling: Bestilling = {
                ...EMPTY_BESTILLING,
                navn: formData.navn,
                email: formData.email,
                forestilling: forestilling,
                sæder: updatedSeats,
                pristotal: selectedSeats.reduce((total, sæde) => total + sæde.pris, 0),
                reservationstidspunkt: new Date().toISOString(),
                betalt: true,
            };
            const addedBestilling = await addBestilling(newBestilling);
            setBestilling(addedBestilling);
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
            <p>Pris: {selectedSeats?.reduce((total, sæde) => total + sæde.pris, 0).toFixed(2)},-</p>{" "}
            <input type="text" placeholder="Navn" value={formData.navn} onChange={handleChange} className="input" name="navn" required />
            <input type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" name="email" required />
            <button onClick={handleSubmit} disabled={!formData.navn || !formData.email} className="bekræft-button">
                Bekræft bestilling
            </button>
        </div>
    );
}
