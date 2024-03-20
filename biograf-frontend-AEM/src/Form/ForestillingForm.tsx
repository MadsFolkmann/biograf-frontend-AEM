import "./ForestillingForm.css";
import { useState, useEffect } from "react";
import { addForestilling, deleteForestilling, Film, Forestilling, Biograf, Sal, getForestillinger, getBiografer, getBiografsale, getFilms } from "../services/apiFacade";
import { useLocation } from "react-router-dom";

const EMPTY_FORESTILLING: Forestilling = {
  id: 0,
  film: null as Film | null,
  biograf: null as Biograf | null,
  sal: null as Sal | null,
  sæder: [],
  tidspunkt: "",
};

export default function ForestillingForm() {
  const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);
  const [film, setFilm] = useState<Film[]>([]);
  const [biograf, setBiograf] = useState<Biograf[]>([]);
  const [sal, setSal] = useState<Sal[]>([]);
  const forestillingToEdit = useLocation().state || null;
  const [formData, setFormData] = useState<Forestilling>(forestillingToEdit || EMPTY_FORESTILLING);
  const [error, setError] = useState<string>("");

useEffect(() => {
    getForestillinger().then((res) => setForestillinger(res));
    getFilms().then((res) => setFilm(res));
    getBiografer().then((res) => setBiograf(res));
}, []);
    
    //Fylder sal-dropdown med salene fra den valgte biograf
      useEffect(() => {
          if (formData.biograf) {
              getBiografsale(Number(formData.biograf.id)).then((res) => setSal(res));
          }
      }, [formData.biograf]);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "tidspunkt" ? value : Number(value),
    }));

      if (name === "biograf") {
          getBiografsale(Number(value)).then((res) => setSal(res));
      }
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
      console.log("formData", formData);
      
    try {
        const modifiedData = {
            ...formData,
            film: { id: Number(formData.film) },
            biograf: formData.biograf
                ? typeof formData.biograf === "object"
                    ? { id: Number(formData.biograf.id) }
                    : { id: Number(formData.biograf) }
                : null,
            sal: formData.sal ? (typeof formData.sal === "object" ? { id: Number(formData.sal.id) } : { id: Number(formData.sal) }) : null,
        };
        const newForestilling = await addForestilling(modifiedData);
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
                  <label htmlFor="id">ID:</label>
                  <input type="text" id="name" name="name" disabled value={formData.id || ""} />
              </div>
              <div className="form-group">
                  <label htmlFor="film">Film:</label>
                  <select id="film" name="film" value={formData.film?.id} onChange={handleChange} required>
                      <option value="">Select Film</option>

                      {film.map((film) => (
                          <option key={film.id} value={film.id}>
                              {film.titel}
                          </option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="biograf">Biograf:</label>
                  <select id="biograf" name="biograf" value={formData.biograf?.id} onChange={handleChange} required>
                      <option value="">Select Biograf</option>
                      {biograf.map((biograf) => (
                          <option key={biograf.id} value={biograf.id}>
                              {biograf.navn}
                          </option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="sal">Sal:</label>
                  <select id="sal" name="sal" value={formData.sal?.id} onChange={handleChange} required>
                      <option value="">Select Sal</option>
                      {sal.map((sal) => (
                          <option key={sal.id} value={sal.id}>
                              {sal.nummer}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="form-group">
                  <label htmlFor="tidspunkt">Tidspunkt:</label>
                  <input type="datetime-local" id="tidspunkt" name="tidspunkt" value={formData.tidspunkt} onChange={handleChange} required />
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
