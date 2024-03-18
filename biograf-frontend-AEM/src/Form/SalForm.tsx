import "./SalForm.css";
import { useState, useEffect } from "react";
import { addSal, deleteSal, Sal, getSale, Biograf, getBiografer, SalType,getBiografsale } from "../services/apiFacade";
import { useLocation } from "react-router-dom";


const EMPTY_SAL: Sal = {
  id: 0,
  nummer: 0,
  biograf: null as Biograf | null,
  antalSæderPrRække: 0,
  antalRækker: 0,
  salType: SalType.LILLE,
};

export default function SalForm() {
    const [sale, setSale] = useState<Sal[]>([]);
    const [biograf, setBiograf] = useState<Biograf[]>([]);
    const salToEdit = useLocation().state || null;
    const [formData, setFormData] = useState<Sal>(salToEdit || EMPTY_SAL);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getSale().then((res) => setSale(res));
    }, []);

    useEffect(() => {
        getBiografer().then((res) => setBiograf(res));
    }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "biograf" ? Number(value) : value,
    }));
};

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (formData.id) {
            deleteSal(Number(formData.id));
            setFormData({ ...EMPTY_SAL });
        }
    };

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    console.log(biograf);
    
    console.log(formData);
    
    
    const biografSale = await getBiografsale(formData.biograf);
    console.log(biografSale);
    
    if (biografSale.length < biograf[0].antalSale) {
            console.log("Submit clicked");
        try { 
                            const modifiedData = {
                                ...formData,
                                nummer: Number(formData.nummer),
                                antalRækker: Number(formData.antalRækker),
                                antalSæderPrRække: Number(formData.antalSæderPrRække),
                                biograf: { id: formData.biograf },
            };
            
                const newSal = await addSal(modifiedData);
                alert("New sal added");
                console.info("New/Edited Sal", newSal);
                setFormData(newSal);
            } catch (error) {
                setError("Error adding/editing sal");
            }
        } else {
            setError("Cannot add more sale to this biograf");
        }
    
};

return (
    <>
        <h2>Sal Add/Edit/Delete</h2>
        <form id="salForm">
            <div className="form-group">
                <label htmlFor="biograf">Biograf:</label>
                <select id="biograf" name="biograf" value={formData.biograf} onChange={handleChange} required>
                    <option value="">Select Biograf</option>
                    {biograf.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.navn}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="nummer">Sal Nummer:</label>
                <input type="number" id="nummer" name="nummer" value={formData.nummer} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="antalSæderPrRække">Antal Sæder Pr Række:</label>
                <input
                    type="number"
                    id="antalSæderPrRække"
                    name="antalSæderPrRække"
                    value={formData.antalSæderPrRække}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="antalRækker">Antal Rækker:</label>
                <input type="number" id="antalRækker" name="antalRækker" value={formData.antalRækker} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="salType">Sal Type:</label>
                <select id="salType" name="salType" value={formData.salType} onChange={handleChange} required>
                    {Object.values(SalType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSubmit} className="sal-submit">
                Submit
            </button>
            <button onClick={handleDelete} className="sal-delete">
                Delete
            </button>
        </form>
        {error && <p>{error}</p>}
    </>
);
}
