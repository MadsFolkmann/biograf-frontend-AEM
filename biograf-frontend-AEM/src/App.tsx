import { Routes, Route } from "react-router-dom";
import { Biograf } from "./Component/Biograf";
import { Film } from "./Component/Film";
import BiografList from "./List/BiografList";
import BiografForm from "./Form/BiografForm";
import FilmForm from "./Form/FilmForm";
// import BiografLayout from "./Form/BiografLayout";
import Login from "./security/Login";
import Logout from "./security/Logout";
import RequireAuth from "./security/RequireAuth";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biograf" element={<Biograf />} />
        <Route path="/biograf/:id" element={<Biograf />} />
        <Route path="/film" element={<Film />} />

        <Route
          path="/addBiograf"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <BiografForm />
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
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Layout>
  );
}
