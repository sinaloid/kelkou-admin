import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";

export const Commande = () => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="text-start mb-3">Mes commandes</h1>
          <div className="d-flex align-items-center">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Rechercher..."
                />
                <span class="input-group-text">
                  <SearchIcon />
                </span>
              </div>
            </div>
            <div>
              <span className="ms-2">
                <PrevIcon />
              </span>
              <span className="ms-2">
                <SuivIcon />
              </span>
            </div>
            <span className="fw-bold">Page 1 / 2</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Numéro</th>
                <th scope="col">Date</th>
                <th scope="col">client</th>
                <th scope="col">Montant total</th>
                <th scope="col">Statut</th>
                <th scope="col">Détail</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(11).keys()].map((data, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>CMD7485X{idx + 1}</td>
                    <td>12/11/2023</td>
                    <td>Traore Ali</td>
                    <td>250.000 Fcfa</td>
                    <td>En attente</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-primary-light mx-1 rounded-3">
                          <EyeIcon /> Voir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
