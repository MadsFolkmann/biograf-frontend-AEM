import "./BiografForm.css";
import { useState, useEffect } from "react";
import { addBiograf, deleteBiograf, Biograf, getBiografer} from "../services/apiFacade";
import { useLocation } from "react-router-dom";

const EMPTY_BIOGRAF: Biograf = {
    id: 0,
    navn: "",
    adresse: "",
    antalSale: 0,
};

export default function BiografForm() {
  const [biografer, setBiografer] = useState<Biograf[]>([]);
    const biografToEdit = useLocation().state || null;
    const [formData, setFormData] = useState<Biograf>(biografToEdit || EMPTY_BIOGRAF);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getBiografer().then((res) => setBiografer(res));
    }, []);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "antalSale" ? parseInt(value, 10) : value,
    }));
};

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (formData.id) {
            deleteBiograf(Number(formData.id));
            setFormData({ ...EMPTY_BIOGRAF });
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      try {
          console.log(formData);
          
            const newBiograf = await addBiograf(formData);
            alert("New biograf added");
            console.info("New/Edited Biograf", newBiograf);
            setFormData(newBiograf);
        } catch (error) {
            setError("Error adding/editing biograf");
        }
    };

return (
    <>
        <h2>Biograf Add/Edit/Delete</h2>
        <form id="biografForm">
            <div className="form-group">
                <label htmlFor="navn">Navn:</label>
                <input type="text" id="navn" name="navn" value={formData.navn} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="adresse">Adresse:</label>
                <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="antalSale">Antal Sale:</label>
                <input type="number" id="antalSale" name="antalSale" value={formData.antalSale} onChange={handleChange} required />
            </div>
        </form>
        <button onClick={handleSubmit} className="biograf-form-btn">
            Submit
        </button>
        <button
            className="biograf-form-btn"
            onClick={() => {
                setFormData({ ...EMPTY_BIOGRAF });
            }}
        >
            Cancel
        </button>
        {formData.id && (
            <button className="biograf-form-btn" onClick={handleDelete}>
                Delete
            </button>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
    </>
);
}
