import "./ForestillingForm.css";
import { useState, useEffect } from "react";
import { addForestilling, deleteForestilling, Forestilling, getForestillinger } from "../services/apiFacade";
import { useLocation } from "react-router-dom";

const EMPTY_FORESTILLING: Forestilling = {
  id: 0,
  film: [],
  biograf: [],
  sal: [],
  sæde: [],
  tidspunkt: "",
};

export default function ForestillingForm() {
  const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);
  const forestillingToEdit = useLocation().state || null;
  const [formData, setFormData] = useState<Forestilling>(forestillingToEdit || EMPTY_FORESTILLING);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getForestillinger().then((res) => setForestillinger(res));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.id) {
      deleteForestilling(Number(formData.id));
      setFormData({ ...EMPTY_FORESTILLING });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const newForestilling = await addForestilling(formData);
      alert("New forestilling added");
      console.info("New/Edited Forestilling", newForestilling);
      setFormData(newForestilling);
    } catch (error) {
      setError("Error adding/editing forestilling");
    }
  };

  return (
    <>
      <h2>Forestilling Add/Edit/Delete</h2>
      <form id="forestillingForm">
        <div className="form-group">
          <label htmlFor="film">Film:</label>
          <input type="text" id="film" name="film" value={formData.film.titel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="biograf">Biograf:</label>
          <input type="text" id="biograf" name="biograf" value={formData.biograf.navn} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="sal">Sal:</label>
          <input type="text" id="sal" name="sal" value={formData.sal.navn} onChange={handleChange} required />
        </div>
        {/* <div className="form-group">
          <label htmlFor="sæde">Sæde:</label>
          <input type="text" id="sæde" name="sæde" value={formData.sæde.map((sæde) => sæde.navn).join(", ")} onChange={handleChange} required />
        </div> */}
        <div className="form-group">
          <label htmlFor="tidspunkt">Tidspunkt:</label>
          <input type="text" id="tidspunkt" name="tidspunkt" value={formData.tidspunkt} onChange={handleChange} required />
        </div>
        <button className="forestilling-edit" onClick={handleSubmit}>
          Add/Edit
        </button>
        <button className="forestilling-edit" onClick={handleDelete}>
          Delete
        </button>
      </form>
      <p>{error}</p>
    </>
  );
}
