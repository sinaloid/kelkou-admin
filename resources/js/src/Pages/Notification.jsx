import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";

export const Notification = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="text-start mb-3">Notifications</h1>
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
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom Prenom</th>
              <th scope="col">Id commande</th>
              <th scope="col">Montant</th>
              <th scope="col">Etat de la commande</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Traore Ali</td>
              <td>N78459644</td>
              <td>15000 Fcfa</td>
              <td>En cours</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Sanou Moussa</td>
              <td>N78459708</td>
              <td>25000 Fcfa</td>
              <td>Annuler</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Kabore Karim</td>
              <td>N78459602</td>
              <td>45000 Fcfa</td>
              <td>Livrer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
