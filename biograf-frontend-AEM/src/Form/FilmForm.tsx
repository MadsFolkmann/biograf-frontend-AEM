import React, { useState, useEffect } from "react";
import { addFilm, deleteFilm, Film, getFilms } from "../services/apiFacade";
import { useLocation } from "react-router-dom";
import "./FilmForm.css";

const EMPTY_FILM: Film = {
  id: 0,
  titel: "",
  varighed: 0,
  genre: "",
  billede: "",
  er3D: false,
  filmBeskrivelse: "",
  filmSprog: "",
};

export default function FilmForm() {
  const [films, setFilms] = useState<Film[]>([]);
  const filmToEdit = useLocation().state || null;
  const [formData, setFormData] = useState<Film>(filmToEdit || EMPTY_FILM);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getFilms().then((res) => setFilms(res));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      if (formData.id) {
        await deleteFilm(formData.id);
        setFormData({ ...EMPTY_FILM });
        setError(""); // Clear error if successful
      }
    } catch (error) {
      setError("Error deleting film");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      
      const newFilm = await addFilm(formData);
      alert("New film added");
      console.info("New/Edited Film", newFilm);
      setFormData(newFilm);
      setError(""); // Clear error if successful
    } catch (error) {
      setError("Error adding/editing film");
    }
  };

  return (
    <div className="film-form-container">
      <h2 className="film-form-header">Film Add/Edit/Delete</h2>
      <form className="film-form">
        <div className="form-group">
          <label htmlFor="titel">Titel:</label>
          <input type="text" id="titel" name="titel" value={formData.titel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="varighed">Varighed (min):</label>
          <input type="number" id="varighed" name="varighed" value={formData.varighed} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="billede">Billede URL:</label>
          <input type="text" id="billede" name="billede" value={formData.billede} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="er3D">Er 3D:</label>
          <input type="checkbox" id="er3D" name="er3D" checked={formData.er3D} onChange={() => setFormData({ ...formData, er3D: !formData.er3D })} />
        </div>
        <div className="form-group">
          <label htmlFor="filmBeskrivelse">Beskrivelse:</label>
          <textarea id="filmBeskrivelse" name="filmBeskrivelse" value={formData.filmBeskrivelse} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="filmSprog">Sprog:</label>
          <input type="text" id="filmSprog" name="filmSprog" value={formData.filmSprog} onChange={handleChange} required />
        </div>
      </form>
      <button onClick={handleSubmit} className="film-form-btn">
        Submit
      </button>
      <button
        className="film-form-btn"
        onClick={() => {
          setFormData({ ...EMPTY_FILM });
        }}
      >
        Cancel
      </button>
      {formData.id && (
        <button className="film-form-btn" onClick={handleDelete}>
          Delete
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
