import { useState, useEffect } from "react";
import { Bestilling, getForestilling, getSæder } from "../services/apiFacade";
import "./BestillingForm.css";
import { useLocation } from "react-router-dom";

const EMPTY_BESTILLING: Bestilling = {
    id: 0,
    navn: "",
    email: "",
    forestilling: [],
    sæder: [],
    pristotal: 0,
    reservationstidspunkt: "",
    betalt: false,
};

export default function BestillingForm() {
    const [bestilling, setBestilling] = useState<Bestilling>(EMPTY_BESTILLING);
    const [error, setError] = useState<string>("");
    const bestillingToEdit = useLocation().state || null;
    const [formData, setFormData] = useState<Bestilling>(bestillingToEdit || EMPTY_BESTILLING);

    useEffect(() => {
        setBestilling(formData);
    }, [formData]);
}
