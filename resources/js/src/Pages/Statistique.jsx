import { ArticleIcon } from "../assets/icons/ArticleIcon";
import { PeopleIcon } from "../assets/icons/ClientIcon";
import { NotificationIcon } from "../assets/icons/NotificationIcon";
import { SuperMarcherIcon } from "../assets/icons/SuperMarcherIcon";
import { ViewDoughnut } from "../components/Doughnut";
import { ViewArea } from "../components/ViewArea";
import { ViewBar } from "../components/ViewBar";

export const Statistique = () => {
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
          <h1 className="text-start mb-3">Statistique</h1>
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
      <div className="row mb-4">
        <div className="col-12 col-md-6 text-start">
          <span className="fw-bold fs-20 d-inline-block mb-3">Répartition des chiffres d'affaires par article</span>
          <ViewDoughnut />
        </div>
        
      </div>
      
    </>
  );
};
