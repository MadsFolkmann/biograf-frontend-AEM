import React from "react";
import { useState, useEffect } from "react";
import { getSale, Sal as ApiSal } from "../services/apiFacade";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import "./Sal.css";

export const Sal = () => {
    const [sale, setSale] = useState<ApiSal[]>([]);
    const auth = useAuth();

    useEffect(() => {
        getSale().then((res) => setSale(res));
    }, []);

    return (
        <div>
            <h1>Sal Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Biograf</th>
                        <th>Antal Sæder Pr Række</th>
                        <th>Antal Rækker</th>
                        <th>Sal Type</th>
                        <th>Nummer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.map((sal) => (
                        <tr key={sal.id}>
                            <td>{sal.id}</td>
                            <td>{sal.biograf ? sal.biograf?.navn : "N/A"}</td>
                            <td>{sal.antalSæderPrRække}</td>
                            <td>{sal.antalRækker}</td>
                            <td>{sal.salType}</td>
                            <td>{sal.nummer}</td>
                            <td>
                                {auth.isLoggedInAs(["ADMIN"]) && (
                                    <Link to="/addSal" state={sal} className="sal-edit">
                                        Edit
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
