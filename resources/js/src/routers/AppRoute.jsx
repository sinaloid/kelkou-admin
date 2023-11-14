import { Route, Routes } from "react-router-dom";
import { Accueil } from "../Pages/Accueil";
import { MonCompte } from "../Pages/MonCompte";
import { BoiteReception } from "../Pages/BoiteReception";
import Dashboard from "../Pages/Dashboard";
import { Login } from "../Pages/Login";
import AppLink from "./AppLink";
import { Produit } from "../Pages/Produit";
import { Commande } from "../Pages/Commande";
import { Paiement } from "../Pages/Paiement";
import { Personnel } from "../Pages/Personnel";
import { Statistique } from "../Pages/Statistique";
import { Partenaire } from "../Pages/Partenaire";
import { Categorie } from "../Pages/Categorie";
import { Livreur } from "../Pages/Livreur";
import { Client } from "../Pages/Client";
import { Notification } from "../Pages/Notification";


const AppRoute = ({ type }) => {
  if (type === "dashboard") {
    return (
      <Routes>
        <Route path={AppLink.accueil} element={<Accueil />} />
        <Route path={AppLink.commandes} element={<Commande />} />
        <Route path={AppLink.produits} element={<Produit />} />
        <Route path={AppLink.categories} element={<Categorie />} />
        <Route path={AppLink.partenaires} element={<Partenaire />} />
        <Route path={AppLink.paiements} element={<Paiement />} />
        <Route path={AppLink.personnel} element={<Personnel />} />
        <Route path={AppLink.livreurs} element={<Livreur />} />
        <Route path={AppLink.clients} element={<Client />} />
        <Route path={AppLink.notifications} element={<Notification />} />
        <Route path={AppLink.boiteReception} element={<BoiteReception />} />
        <Route path={AppLink.monCompte} element={<MonCompte />} />
        <Route path={AppLink.statistique} element={<Statistique />} />
      </Routes>
    );
  }

  if (type === "app") {
    return (
      <Routes>
        <Route path={AppLink.dashboard+AppLink.all} element={<Dashboard />} />
        <Route path={AppLink.dashboard} element={<Dashboard />} />
        <Route path={AppLink.login} element={<Login />} />
      </Routes>
    );
  }
};

export default AppRoute;
