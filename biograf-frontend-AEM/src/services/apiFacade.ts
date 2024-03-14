import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const BIOGRAF_URL = API_URL + "/biograf";
const FILM_URL = API_URL + "/film";
const FORESTILLING_URL = API_URL + "/forestilling";
const SAL_URL = API_URL + "/sal";
const SÆDE_URL = API_URL + "/sæde";
const INFO_URL = API_URL + "/info";

interface Biograf {
  id: number;
  navn: string;
  adresse: string;
  antalSale: number;
  sal: Array<Sal>;
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
  bio: Biograf;
  film: Film;
  sal: Sal;
  sæde: Array<Sæde>;
}

interface Sal {
  id: number;
  antalSæder: number;
  antalRækker: number;
  salType: string;
}

interface Sæde {
  id: number;
  række: number;
  sædeNummer: number;
  sædeType: string;
  pris: number;
  optaget: boolean;
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

async function getFilm(): Promise<Array<Film>> {
  return fetch(FILM_URL).then(handleHttpErrors);
}

async function getSpecificFilm(id: number): Promise<Film> {
  return fetch(`${FILM_URL}/${id}`).then(handleHttpErrors);
}

async function getForestillinger(): Promise<Array<Forestilling>> {
  return fetch(FORESTILLING_URL).then(handleHttpErrors);
}

async function getForestilling(id: number): Promise<Forestilling> {
  return fetch(`${FORESTILLING_URL}/${id}`).then(handleHttpErrors);
}

async function getSale(): Promise<Array<Sal>> {
  return fetch(SAL_URL).then(handleHttpErrors);
}

async function getSal(id: number): Promise<Sal> {
  return fetch(`${SAL_URL}/${id}`).then(handleHttpErrors);
}

async function getSæder(): Promise<Array<Sæde>> {
  return fetch(SÆDE_URL).then(handleHttpErrors);
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

/////////////////// POST ROUTES ///////////////////
async function addBiograf(newBiograf: Biograf): Promise<Biograf> {
  const options = makeOptions("POST", newBiograf, true);
  return fetch(BIOGRAF_URL, options).then(handleHttpErrors);
}

async function addFilm(newFilm: Film): Promise<Film> {
  const options = makeOptions("POST", newFilm, true);
  return fetch(FILM_URL, options).then(handleHttpErrors);
}

async function addForestilling(newForestilling: Forestilling): Promise<Forestilling> {
  const options = makeOptions("POST", newForestilling, true);
  return fetch(FORESTILLING_URL, options).then(handleHttpErrors);
}

async function addSal(newSal: Sal): Promise<Sal> {
  const options = makeOptions("POST", newSal, true);
  return fetch(SAL_URL, options).then(handleHttpErrors);
}

async function addSæde(newSæde: Sæde): Promise<Sæde> {
  const options = makeOptions("POST", newSæde, true);
  return fetch(SÆDE_URL, options).then(handleHttpErrors);
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

export type { Biograf, Film, Forestilling, Sal, Sæde, Info };

export { deleteBiograf, deleteFilm, deleteForestilling, deleteSal, deleteSæde };
export { addBiograf, addFilm, addForestilling, addSal, addSæde };
export { getBiografer, getBiograf, getFilm, getSpecificFilm, getForestillinger, getForestilling, getSale, getSal, getSæder, getSæde, getInfo };
