import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";

export const Paiement = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="text-start mb-3">Mes paiements</h1>
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
              <th scope="col">Id transaction</th>
              <th scope="col">Type</th>
              <th scope="col">Montant</th>
              <th scope="col">Etat de la commande</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10).keys()].map((data, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">1</th>
                  <td>Traore Ali</td>
                  <td>N78459644</td>
                  <td>TS7845964</td>
                  <td>Orange Money</td>
                  <td>15000 Fcfa</td>
                  <td>En cours</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
