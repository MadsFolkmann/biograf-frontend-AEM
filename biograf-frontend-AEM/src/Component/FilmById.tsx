import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getForestillingerByFilmID, Forestilling ,getSpecificFilm, Film as ApiFilm } from "../services/apiFacade";
import "./FilmById.css";

export default function FilmById() {
    const { id } = useParams();
    console.log("id", id);
    const [forestillinger, setForestillinger] = useState<Forestilling[]>([]);
    

    const [film, setFilm] = useState<ApiFilm | null>(null);
    useEffect(() => {
        getSpecificFilm(Number(id)).then((res) => setFilm(res));
    }, [id]);
    
    useEffect(() => {
        getForestillingerByFilmID(Number(id)).then((res) => setForestillinger(res));
    }, [id]);

    console.log("forestillinger", forestillinger);
    
return (
    <div className="film-detail-container">
        <div className="film-detail-top">
            <img className="film-detail-image" src={film?.billede} alt={film?.titel} />
            <div className="film-detail-content">
                <h2 className="film-detail-title">{film?.titel}</h2>
                <p className="film-detail-description">
                    <strong>Beskrivelse:</strong> {film?.filmBeskrivelse}
                </p>
                <p className="film-detail-duration">
                    <strong>Varighed:</strong> {film?.varighed}
                </p>
                <p className="film-detail-genre">
                    <strong>Genre:</strong> {film?.genre}
                </p>
                <p className="film-detail-language">
                    <strong>Sprog:</strong> {film?.filmSprog}
                </p>
                <p className="film-detail-3d">
                    <strong>Er 3D:</strong> {film?.er3D ? "Ja" : "Nej"}
                </p>
            </div>
        </div>
        <div className="film-detail-forestillinger">
            <h3>Forestillinger</h3>
            <ul>
                {forestillinger.map((f) => (
                    <li key={f.id}>
                        <h4>Biograf: {f.biograf?.navn}</h4>
                        <p>Tidspunkt: {f.tidspunkt}</p>
                        <p>Sal: {f.sal?.nummer}</p>
                        <Link to={`/saeder/forestilling/${f.id}`} className="bestil-billet-button">
                            <button type="button" className="bestil-billet-button">
                                Bestil billet
                            </button>
                        </Link>{" "}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
    }


