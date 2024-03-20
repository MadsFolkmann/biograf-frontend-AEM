import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const BIOGRAF_URL = API_URL + "/biograf";
const FILM_URL = API_URL + "/film";
const FORESTILLING_URL = API_URL + "/forestilling";
const SAL_URL = API_URL + "/sal";
const SÆDE_URL = API_URL + "/sæder";
const BESTILLING_URL = API_URL + "/bestilling";
const INFO_URL = API_URL + "/info";
const MEDLEMMER_URL = API_URL + "/api/user-with-role/all";

interface Biograf {
  id: number;
  navn: string;
  adresse: string;
  antalSale: number;
}

interface Film {
  id: number;
  titel: string;
  varighed: number;
  genre: string;
  billede: string;
  er3D: boolean;
  filmBeskrivelse: string;
  filmSprog: string;
}

interface Forestilling {
  id: number;
  biograf: Biograf | null;
  film: Film | null;
  sal: Sal | null;
  sæder: Array<Sæde>;
  tidspunkt: string;
}

interface Sal {
  id: number;
  biograf: Biograf | null;
  antalSæderPrRække: 0;
  antalRækker: number;
  salType: SalType;
  nummer: number;
}

interface Medlemmer {
  id: number;
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  created: string;
}

enum SalType {
  LILLE = "LILLE",
  MELLEM = "MELLEM",
  STOR = "STOR",
}

enum SædeType {
  STANDARD = "STANDARD",
  VIP = "VIP",
  COWBOY = "COWBOY",
}

interface Sæde {
  id: number;
  række: number;
  sædeNummer: number;
  sædeType: SædeType;
  pris: number;
  optaget: boolean;
}

interface Bestilling {
    id: number;
    navn: string;
    email: string;
    forestilling: Forestilling | null;
    sæder: Array<Sæde> | null;
    pristotal: number;
    reservationstidspunkt: string;
    betalt: boolean;
}

interface Info {
  reference: string;
  created: string;
  info: string;
}

let biografer: Array<Biograf> = [];
let film: Array<Film> = [];
let forestillinger: Array<Forestilling> = [];
let sale: Array<Sal> = [];
let sæder: Array<Sæde> = [];
let medlemmer: Array<Medlemmer> = [];
let info: Info | null = null;

/////////////////// GET ROUTES ///////////////////

async function getBiografer(): Promise<Array<Biograf>> {
  if (biografer.length > 0) return [...biografer];

  try {
    const res = await fetch(BIOGRAF_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const biograferData = await res.json(); // Parse responsen som JSON
    console.log("Biografer fetched successfully:", biograferData); // Log dataene
    biografer = biograferData; // Tildel dataene til biografer-arrayen
    return biografer;
  } catch (error) {
    console.error("Error fetching biografer:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
}

async function getBiograf(id: number): Promise<Biograf> {
  const response = await fetch(`${BIOGRAF_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch biograf");
  }
  return await response.json();
}

async function getFilms(): Promise<Array<Film>> {
  if (film.length > 0) return [...film];

  try {
    const res = await fetch(FILM_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const filmData = await res.json();
    console.log("Film fetched successfully:", filmData);
    film = filmData;
    return film;
  } catch (error) {
    console.error("Error fetching film:", error);
    throw error;
  }
}
async function getSpecificFilm(id: number): Promise<Film> {
  return fetch(`${FILM_URL}/${id}`).then(handleHttpErrors);
}
async function getForestillingerByFilmID(id: number): Promise<Array<Forestilling>> {
  return fetch(`${FORESTILLING_URL}/film/${id}`).then(handleHttpErrors);
}

async function getForestillinger(): Promise<Array<Forestilling>> {
  if (forestillinger.length > 0) return [...forestillinger];

  try {
    const res = await fetch(FORESTILLING_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const forestillingData = await res.json();
    console.log("Forestillinger fetched successfully:", forestillingData);
    forestillinger = forestillingData;
    return forestillinger;
  } catch (error) {
    console.error("Error fetching forestillinger:", error);
    throw error;
  }
}

async function getForestilling(id: number): Promise<Forestilling> {
  return fetch(`${FORESTILLING_URL}/${id}`).then(handleHttpErrors);
}

async function getSale(): Promise<Array<Sal>> {
  if (sale.length > 0) return [...sale];

  try {
    const res = await fetch(SAL_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const salData = await res.json();
    console.log("Sale fetched successfully:", salData);
    sale = salData;
    return sale;
  } catch (error) {
    console.error("Error fetching sale:", error);
    throw error;
  }
}

async function getSal(id: number): Promise<Sal> {
  return fetch(`${SAL_URL}/${id}`).then(handleHttpErrors);
}

async function getBiografsale(id: number): Promise<Array<Sal>> {
  return fetch(`${SAL_URL}/biograf/${id}`).then(handleHttpErrors);
}

async function getSæder(): Promise<Array<Sæde>> {
  if (sæder.length > 0) return [...sæder];

  try {
    const res = await fetch(SÆDE_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const sædeData = await res.json();
    console.log("Sæder fetched successfully:", sædeData);
    sæder = sædeData;
    return sæder;
  } catch (error) {
    console.error("Error fetching sæder:", error);
    throw error;
  }
}

async function getSæde(id: number): Promise<Sæde> {
  return fetch(`${SÆDE_URL}/${id}`).then(handleHttpErrors);
}

async function getInfo(): Promise<Info> {
  if (info) {
    return info;
  }
  info = (await fetch(INFO_URL).then(handleHttpErrors)) as Info;
  return info;
}

async function getMedlemmer(): Promise<Array<Medlemmer>> {
  if (medlemmer.length > 0) return [...medlemmer];

  try {
    const res = await fetch(MEDLEMMER_URL);
    if (!res.ok) {
      throw new Error("Fetch request failed");
    }

    const medlemmerData = await res.json();
    console.log("Medlemmer fetched successfully:", medlemmerData);
    medlemmer = medlemmerData;
    return medlemmer;
  } catch (error) {
    console.error("Error fetching medlemmer:", error);
    throw error;
  }
}

async function getMedlemmerId(id: number): Promise<Medlemmer> {
  return fetch(`${MEDLEMMER_URL}/${id}`).then(handleHttpErrors);
}

/////////////////// POST ROUTES ///////////////////
async function addBiograf(newBiograf: Biograf): Promise<Biograf> {
  const method = newBiograf.id ? "PUT" : "POST";
  const options = makeOptions(method, newBiograf, true);
  const URL = newBiograf.id ? `${BIOGRAF_URL}/${newBiograf.id}` : BIOGRAF_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function addFilm(newFilm: Film): Promise<Film> {
  const method = newFilm.id ? "PUT" : "POST";
  const options = makeOptions(method, newFilm, true);
  const URL = newFilm.id ? `${FILM_URL}/${newFilm.id}` : FILM_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function addForestilling(newForestilling: Forestilling): Promise<Forestilling> {
  const method = newForestilling.id ? "PUT" : "POST";
  const options = makeOptions(method, newForestilling, true);
  const URL = newForestilling.id ? `${FORESTILLING_URL}/${newForestilling.id}` : FORESTILLING_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function addSal(newSal: Sal): Promise<Sal> {
  const method = newSal.id ? "PUT" : "POST";
  const options = makeOptions(method, newSal, true);
  const URL = newSal.id ? `${SAL_URL}/${newSal.id}` : SAL_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function addBestilling(newBestilling: Bestilling): Promise<Bestilling> {
    const options = makeOptions("POST", newBestilling, false);
    return fetch(BESTILLING_URL, options).then(handleHttpErrors);
}

/////////////////// DELETE ROUTES ///////////////////
async function deleteBiograf(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${BIOGRAF_URL}/${id}`, options).then(handleHttpErrors);
}

async function deleteFilm(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${FILM_URL}/${id}`, options).then(handleHttpErrors);
}

async function deleteForestilling(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${FORESTILLING_URL}/${id}`, options).then(handleHttpErrors);
}

async function deleteSal(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${SAL_URL}/${id}`, options).then(handleHttpErrors);
}

async function deleteSæde(id: number): Promise<void> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${SÆDE_URL}/${id}`, options).then(handleHttpErrors);
}

export type { Biograf, Film, Forestilling, Sal, Sæde, Info, Medlemmer, Bestilling };

export { SalType };
export { deleteBiograf, deleteFilm, deleteForestilling, deleteSal, deleteSæde };
export { addBiograf, addFilm, addForestilling, addSal, addBestilling};
export {
  getBiografer,
  getBiograf,
  getFilms,
  getSpecificFilm,
  getForestillinger,
  getForestilling,
  getSale,
  getSal,
  getSæder,
  getSæde,
  getInfo,
  getForestillingerByFilmID,
  getBiografsale,
  getMedlemmer,
};
