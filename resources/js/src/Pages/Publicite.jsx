import { useFormik } from "formik";
import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";
import { Input } from "../components/Input";

export const Publicite = () => {
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            console.log(values);
            if (values.slug) {
                //update(values);
            } else {
                //post(values);
            }
        },
    });

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1 className="text-start mb-3">Publicités</h1>

                    <div className="d-flex">
                        <div className="d-flex align-items-center me-auto">
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
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#produit"
                                onClick={(e) => formik.resetForm()}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Description</th>
                                <th scope="col">Type</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10).keys()].map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">1</th>
                                        <td>Video produit XXX</td>
                                        <td>Lorem ipsum</td>
                                        <td>video</td>
                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-primary-light mx-1 rounded-3"
                                                    //onClick={(e) => goToDetail(e, data.slug)}
                                                >
                                                    <EyeIcon /> Voir
                                                </button>
                                                <button
                                                    className="btn btn-warning mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#produit"
                                                    //onClick={(e) =>editData(e, data)}
                                                >
                                                    <EditIcon /> Modifier
                                                </button>
                                                <button
                                                    className="btn btn-danger mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    //onClick={(e) =>onSelectData(e, data)}
                                                >
                                                    <DeleteIcon /> supprimer
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
            <div
                className="modal fade"
                id="produit"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Ajout d'une nouvelle publicité
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <Input
                                type={"text"}
                                placeholder="Nom de l'entreprise"
                                name={"nom"}
                                formik={formik}
                            />
                            <Input
                                type={"date"}
                                label="Date de début"
                                placeholder=""
                                name={"dateDebut"}
                                formik={formik}
                            />
                            <Input
                                type={"date"}
                                label="Date de fin"
                                name={"dateFin"}
                                formik={formik}
                            />
                            <Input
                                type={"select"}
                                label="Type de fichier"
                                placeholder="Type de fichier"
                                name={"type"}
                                formik={formik}
                                options={[
                                    { slug: "Image", nom: "Image" },
                                    {
                                        slug: "Video",
                                        nom: "Video",
                                    },
                                ]}
                            />
                            {formik.values["type"] === "Image" && (
                                <Input
                                    type={"file"}
                                    label="Images de la publicité"
                                    placeholder="Images du publicité"
                                    name={"image"}
                                    formik={formik}
                                />
                            )}
                            {formik.values["type"] === "Video" && (
                                <Input
                                type={"file"}
                                label="Courte video de la publicité"
                                placeholder="Courte video de la publicité"
                                name={"video"}
                                formik={formik}
                            />
                            )}

                            
                            <Input
                                type={"textarea"}
                                placeholder="Description du produit"
                                name={"description"}
                                formik={formik}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={close}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={formik.handleSubmit}
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
