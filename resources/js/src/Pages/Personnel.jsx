import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";

export const Personnel = () => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="text-start mb-3">Le personnel</h1>
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
                <th scope="col">Nom Prénom</th>
                <th scope="col">Post</th>
                <th scope="col">Contact</th>
                <th scope="col">Genre</th>
                <th scope="col">Etat du compte</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(11).keys()].map((data, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>Traore Ali</td>
                    <td>Sécretaire</td>
                    <td>
                      75 xx xx xx
                    </td>
                    <td>Homme</td>
                    <td>Actif</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-primary mx-1 rounded-3">
                          <EyeIcon /> Voir
                        </button>
                        <button className="btn btn-success mx-1 rounded-3">
                          <EditIcon /> Modifier
                        </button>
                        <button className="btn btn-danger mx-1 rounded-3">
                          <DeleteIcon /> Supprimer
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
