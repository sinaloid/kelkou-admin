import { useFormik } from "formik";
import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";
import { useEffect, useRef, useState } from "react";
import endPoint from "../services/endPoint";
import { pagination } from "../services/function";
import { Input } from "../components/Input";
import request, { URL } from "../services/request";
import { etatPaiement, moyenPaiement, typePaiement } from "../utils/arrays";

const initData = {
  reference:"",
  date_paiement:"",
  montant:"",
  type_paiement:"",
  moyen_de_paiement:"",
  etat_paiement:"",
  transaction_id:"",
  user:"",
  partenaire:"",
};

export const Paiement = () => {
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const close = useRef();
    const closeDelete = useRef();
    const closeEtat = useRef();
    const [detail, setDetail] = useState("");
    const [viewData, setViewData] = useState({});
    useEffect(() => {
        get();
    }, []);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            
            if (values.slug) {
                update(values);
            } else {
                //values.partenaire = detail.slug;
                post(values);
            }
        },
    });

    const formikRole = useFormik({
      initialValues: {role:""},
      onSubmit: (values) => {
          console.log(values);
          values.slug = viewData.slug
          postRole(values);
      },
  });

    const get = () => {
        request
            .get(endPoint.paiements)
            .then((res) => {
                console.log(res.data.data);
                //setDetail(res.data.data);
                const tab = pagination(res.data.data, 10);

                //console.log(tab);

                if (tab.counter !== 0) {
                    setDatas({
                        all: res.data.data,
                        small: tab.list[0],
                    });
                    setPages(tab);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const post = (values) => {
        request
            .post(endPoint.paiements, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
                formik.resetForm()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const postRole = (values) => {
      request
          .post(endPoint.users+"/role", values)
          .then((res) => {
              console.log(res.data);
              closeRole.current.click();
              get();
          })
          .catch((error) => {
              console.log(error);
          });
  };

    const update = (values) => {
        console.log(values);
        request
            .post(endPoint.paiements +"/"+ values.slug, values)
            .then((res) => {
                console.log(res.data);
                closeEtat.current.click();
                get();
                formik.resetForm()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const destroy = () => {
        request
            .delete(endPoint.paiements+"/"+viewData.slug)
            .then((res) => {
                console.log(res.data);
                closeDelete.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changePage = (e, values) => {
        e.preventDefault();
        const pageNumber = pages.index + parseInt(values);
        console.log(pageNumber);
        if (pageNumber >= 0 && pageNumber < pages.counter) {
            setPages({ ...pages, index: pageNumber });
            setDatas({
                ...datas,
                small: pages.list[pageNumber],
            });
        }
    };

    const onSelectData = (e, data) => {
        e.preventDefault();
        setViewData(data);
    };

    const editData = (e, data) => {
        e.preventDefault();
        console.log(data);
        formik.setFieldValue("_method", "put");
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("date_paiement", data.date_paiement);
        formik.setFieldValue("montant", data.montant);
        formik.setFieldValue("type_paiement", data.type_paiement);
        formik.setFieldValue("moyen_de_paiement", data.moyen_de_paiement);
        formik.setFieldValue("etat_paiement", data.etat_paiement);
        formik.setFieldValue("transaction_id", data.transaction_id);
    };
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Historique des paiements</h1>
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-auto">
                            <div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher..."
                                    />
                                    <span className="input-group-text">
                                        <SearchIcon />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span
                                    className="ms-2"
                                    onClick={(e) => changePage(e, "-1")}
                                >
                                    <PrevIcon />
                                </span>
                                <span
                                    className="ms-2"
                                    onClick={(e) => changePage(e, "+1")}
                                >
                                    <SuivIcon />
                                </span>
                            </div>
                            <span className="fw-bold">
                                Page {pages.index + 1} / {pages.list.length}
                            </span>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#paiement"
                                onClick={(e) => formik.resetForm()}
                            >
                                Faire un paiement
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Référence</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Type</th>
                                <th scope="col">Mode de paiement</th>
                                <th scope="col">Etat</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            {data.reference}
                                        </td>
                                        <td>{data.montant +" Xof"}</td>
                                        <td>{data.type_paiement}</td>
                                        <td>{data.moyen_de_paiement}</td>
                                        <td>
                                            {data.etat_paiement === "en_attente"
                                                && <> <span className="badge text-bg-warning">En attente</span></>}
                                            {data.etat_paiement === "recu"
                                                && <> <span className="badge text-bg-success">Réçu</span></>}
                                            {data.etat_paiement === "annule"
                                                && <> <span className="badge text-bg-danger">Annulé</span></>}    
                                       
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-primary-light mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view1"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                >
                                                    <EyeIcon /> Voir
                                                </button>
                                                
                                                <button
                                                    className="btn btn-warning mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#etat"
                                                    onClick={(e) =>
                                                      editData(e, data)
                                                    }
                                                >
                                                    <EditIcon /> Etat du paiement
                                                </button>
                                                <button
                                                    
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                    className="btn btn-danger mx-1 rounded-3"
                                                >
                                                    <DeleteIcon />{" Supprimer"}
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
                id="paiement"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-start">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Paiement
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <Input
                                type={"text"}
                                label="Montant"
                                placeholder="Entrer le montant"
                                name={"montant"}
                                formik={formik}
                            />
                            <Input
                                type={"date"}
                                label="Date du paiement"
                                name={"date_paiement"}
                                formik={formik}
                            />
                            <Input
                                type={"select"}
                                label="Type de paiement"
                                placeholder="Sélectionnez le type de paiement"
                                name={"type_paiement"}
                                formik={formik}
                                options={typePaiement}
                            />
                            <Input
                                type={"select"}
                                label="Moyen de paiement"
                                placeholder="Sélectionnez un moyen de paiement"
                                name={"moyen_de_paiement"}
                                formik={formik}
                                options={moyenPaiement}
                            />
                            <Input
                                type={"text"}
                                label="Référence du compte"
                                placeholder="Référence du receveur "
                                name={"user"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                label="Référence du partenaire"
                                placeholder="Référence du receveur "
                                name={"partenaire"}
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
            <div
                className="modal fade"
                id="delete"
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
                                Suppression du paiement
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            Voulez-vous continuer ?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={closeDelete}
                            >
                                Non
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={destroy}
                            >
                                Oui
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade modal-lg" id="view">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Détails
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="d-flex">
                                <img
                                    width={"180px"}
                                    height={"180px"}
                                    src={URL + viewData.image}
                                    alt=""
                                />
                                <div className="ps-3 w-100">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <span className="fw-bold fs-20">
                                                {viewData.lastname +
                                                    " " +
                                                    viewData.firstname}
                                            </span>
                                            <br />
                                            <span className="text-muted">
                                                {viewData.role}
                                            </span>
                                        </div>
                                        <div className="ms-auto">
                                            <span>Créer le : </span>
                                            <span className="text-muted ms-auto">
                                                {new Date(
                                                    viewData.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <span>Tél : </span>
                                        <span className="fw-bold">
                                            {viewData.number}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Email : </span>
                                        <span className="fw-bold">
                                            {viewData.email}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Date de naissance : </span>
                                        <span className="fw-bold">
                                            {viewData.birthday}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Genre : </span>
                                        <span className="fw-bold">
                                            {viewData.genre}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="etat"
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
                                Changement de l'etat du paiement
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="mb-2">Etat du paiement</div>
                            <Input
                                type={"select"}
                                placeholder="Sélectionnez l'état du paiement"
                                name={"etat_paiement"}
                                formik={formik}
                                options={etatPaiement}
                            />
                            <Input
                                type={"text"}
                                label="Transaction id"
                                placeholder="Entrer l'id de la transaction"
                                name={"transaction_id"}
                                formik={formik}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={closeEtat}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={formik.handleSubmit}
                            >
                                Enregistre
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
