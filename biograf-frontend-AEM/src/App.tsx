import { Routes, Route } from "react-router-dom";
import React from "react";

import Biograf from "./Component/Biograf";
import { Film } from "./Component/Film";
import { Forestilling } from "./Component/Forestilling";
import { Sal } from "./Component/Sal";
import OmOs from "./Component/OmOs";

import Medlemmer from "./security/Medlemmer";

import FilmById from "./Component/FilmById";
import BiografList from "./List/BiografList";
import BiografForm from "./Form/BiografForm";
import FilmForm from "./Form/FilmForm";
import SalForm from "./Form/SalForm";
import ForestillingForm from "./Form/ForestillingForm";
import OpretForm from "./security/OpretForm";
import BestillingForm from "./Form/BestillingForm";
// import BiografLayout from "./Form/BiografLayout";
import Login from "./security/Login";
import Logout from "./security/Logout";
import RequireAuth from "./security/RequireAuth";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import Sæder from "./Component/Sæder";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biograf" element={<Biograf />} />
        <Route path="/biograf/:id" element={<Biograf />} />
        <Route path="/film" element={<Film />} />

        <Route path="/film/:id" element={<FilmById />} />
        <Route path="/forestilling" element={<Forestilling />} />

        <Route path="/omOs" element={<OmOs />} />

        <Route path="/saeder/forestilling/:id" element={<Sæder />} />

        <Route path="/bestilling" element={<BestillingForm />} />

        <Route path="/sal" element={<Sal />} />

        <Route
          path="/medlemmer"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <Medlemmer />
            </RequireAuth>
          }
        />

        <Route
          path="/addBiograf"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <BiografForm />
            </RequireAuth>
          }
        />

        <Route
          path="/addSal"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <SalForm />
            </RequireAuth>
          }
        />

        <Route
          path="/addFilm"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <FilmForm />
            </RequireAuth>
          }
        />

        <Route
          path="/addForestilling"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <ForestillingForm />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/opret" element={<OpretForm />} />
      </Routes>
    </Layout>
  );
}
