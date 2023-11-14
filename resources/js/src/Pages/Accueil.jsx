import { ArticleIcon } from "../assets/icons/ArticleIcon";
import { PeopleIcon } from "../assets/icons/ClientIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { NotificationIcon } from "../assets/icons/NotificationIcon";
import { SuperMarcherIcon } from "../assets/icons/SuperMarcherIcon";
import { ViewArea } from "../components/ViewArea";
import { ViewBar } from "../components/ViewBar";

export const Accueil = () => {
  const stats = [
    { name: "Commande totale", value: "1250", icon: <SuperMarcherIcon /> },
    { name: "Vente totale", value: "525.125 XOF", icon: <ArticleIcon /> },
    { name: "Personnels", value: "10", icon: <PeopleIcon /> },
    { name: "Produits", value: "325", icon: <ArticleIcon /> },
    { name: "Messages", value: "325", icon: <NotificationIcon /> },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1 className="text-start mb-3">Accueil</h1>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-5 mb-4">
        {stats.map((data, idx) => {
          return (
            <div className="col" key={idx}>
              <div className="border text-start p-2 bg-primary-light rounded-3">
                <span className="d-flex align-items-center justify-content-center rounded-5 icon-circle">
                  {data.icon}
                </span>
                <span>{data.name}</span> <br />
                <span className="fw-bold">{data.value}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row mb-4">
        <div className="col-12 col-md-6 text-start">
          <span className="fw-bold fs-20">Statistique des commandes</span>
          <ViewBar />
        </div>
        <div className="col-12 col-md-6 text-start">
          <span className="fw-bold fs-20">Statistique des Ventes</span>
          <ViewArea />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-start mb-3">
          <span className="fw-bold fs-20">10 dernière commandes de la journée</span>
        </div>
        <div className="col-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom Prenom</th>
                <th scope="col">Id commande</th>
                <th scope="col">Montant</th>
                <th scope="col">Etat de la commande</th>
                <th scope="col">Détail</th>
              </tr>
            </thead>
            <tbody>
              
              {
                [...Array(10).keys()].map((data, idx) => {

                  return <tr key={idx}>
                  <th scope="row">1</th>
                  <td>Traore Ali</td>
                  <td>N78459644</td>
                  <td>15000 Fcfa</td>
                  <td>En cours</td>
                  <td>
                    <div className="btn-group">
                    <button className="btn btn-primary-light mx-1 rounded-3"><EyeIcon /> Voir</button>
                    </div>
                  </td>
                </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
