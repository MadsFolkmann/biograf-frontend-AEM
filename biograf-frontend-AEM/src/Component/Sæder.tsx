import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getForestilling, Forestilling } from "../services/apiFacade";



export default function Sæder() {
    const { id } = useParams();
    console.log("id", id);
    const [forestilling, setForestilling] = useState<Forestilling | null>(null);

    useEffect(() => {
        getForestilling(Number(id)).then((res) => setForestilling(res));
    }, [id]);

    console.log("forestilling", forestilling);

return (
    <div>
        <h2>Sæder</h2>
        <p>Her kan du se og vælge sæder</p>
        <div>
            <h3>Sal: {forestilling?.sal?.nummer}</h3>
            <h4>Tidspunkt: {forestilling?.tidspunkt}</h4>
            <h4>Biograf: {forestilling?.biograf?.navn}</h4>
            <h4>Film: {forestilling?.film?.titel}</h4>
        </div>
        <table>
            {forestilling?.sæder
                .sort((a, b) => a.række - b.række)
                .map((s) => (
                    <tr key={s.id}>
                        <td>Række: {s.række}</td>
                        <td>Sæde: {s.sædeNummer}</td>
                        <td>
                            <button onClick={() => vælgSæde(s.id)}>Vælg</button>
                        </td>
                    </tr>
                ))}
        </table>
    </div>
);

    
}
