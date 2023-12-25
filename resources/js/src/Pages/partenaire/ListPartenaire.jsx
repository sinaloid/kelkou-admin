import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { PrevIcon } from "../../assets/icons/PrevIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { SuivIcon } from "../../assets/icons/SuivIcon";
import endPoint from "../../services/endPoint";
import request, { URL } from "../../services/request";
import { Input } from "../../components/Input";
import { useFormik } from "formik";
import { pagination } from "../../services/function";
import { useNavigate } from "react-router-dom";

const initData = {
    nom_responsable: "",
    email_responsable: "",
    telephone_responsable_1: "",
    telephone_responsable_2: "",
    telephone_responsable_3: "",
    nom_boutique: "",
    email_boutique: "",
    telephone_boutique_1: "",
    telephone_boutique_2: "",
    telephone_boutique_3: "",
    latitude: "",
    longitude: "",
    lundi_ouverture: "",
    lundi_fermeture: "",
    mardi_ouverture: "",
    mardi_fermeture: "",
    mercredi_ouverture: "",
    mercredi_fermeture: "",
    jeudi_ouverture: "",
    jeudi_fermeture: "",
    vendredi_ouverture: "",
    vendredi_fermeture: "",
    samedi_ouverture: "",
    samedi_fermeture: "",
    dimanche_ouverture: "",
    dimanche_fermeture: "",
    image: "",
    description: "",
};
export const ListPartenaire = () => {
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const [viewData, setViewData] = useState({});
    const [viewType, setViewType] = useState(0);
    const navigate = useNavigate();
    const close = useRef();
    const closeDelete = useRef();
    useEffect(() => {
        get();
    }, []);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            const newValues = jourOuverture(values);
            console.log(newValues);

            if (values.slug) {
                 update(newValues);
            } else {
                

                post(newValues);
            }
        },
    });

    const jourOuverture = (values) => {
        const jour_ouverture = {
            lundi: {
                ouverture: values.lundi_ouverture,
                fermeture: values.lundi_fermeture,
            },
            mardi: {
                ouverture: values.mardi_ouverture,
                fermeture: values.mardi_fermeture,
            },
            mercredi: {
                ouverture: values.mercredi_ouverture,
                fermeture: values.mercredi_fermeture,
            },
            jeudi: {
                ouverture: values.jeudi_ouverture,
                fermeture: values.jeudi_fermeture,
            },
            vendredi: {
                ouverture: values.vendredi_ouverture,
                fermeture: values.vendredi_fermeture,
            },
            samedi: {
                ouverture: values.samedi_ouverture,
                fermeture: values.samedi_fermeture,
            },
            dimanche: {
                ouverture: values.dimanche_ouverture,
                fermeture: values.dimanche_fermeture,
            },
        };
        values.jour_ouverture = JSON.stringify(jour_ouverture);

        return values;
    };
    const get = () => {
        request
            .get(endPoint.partenaires)
            .then((res) => {
                console.log(res.data);
                const tab = pagination(res.data.data, 10);

                console.log(tab);

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
            .post(endPoint.partenaires, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const update = (values) => {
        request
            .post(endPoint.partenaires + "/" + values.slug, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const destroy = () => {
        request
            .delete(endPoint.partenaires + "/" + viewData.slug)
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

    const goToDetail = (e, slug) => {
        e.preventDefault();
        navigate("detail/" + slug);
    };

    const onSelectData = (e, data) => {
        e.preventDefault();
        setViewData(data);
    };

    const editData = (e, data) => {
        e.preventDefault();
        formik.setFieldValue("_method", "put");
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("nom_responsable", data.nom_responsable);
        formik.setFieldValue("email_responsable", data.email_responsable);
        formik.setFieldValue(
            "telephone_responsable_1",
            data.telephone_responsable_1
        );
        formik.setFieldValue(
            "telephone_responsable_2",
            data.telephone_responsable_2
        );
        formik.setFieldValue(
            "telephone_responsable_3",
            data.telephone_responsable_3
        );
        formik.setFieldValue("nom_boutique", data.nom_boutique);
        formik.setFieldValue("email_boutique", data.email_boutique);
        formik.setFieldValue("telephone_boutique_1", data.telephone_boutique_1);
        formik.setFieldValue("telephone_boutique_2", data.telephone_boutique_2);
        formik.setFieldValue("telephone_boutique_3", data.telephone_boutique_3);
        formik.setFieldValue("latitude", data.latitude);
        formik.setFieldValue("longitude", data.longitude);
        data.jour_ouverture = JSON.parse(data.jour_ouverture)
        Object.keys(data.jour_ouverture).map((key) => {
            formik.setFieldValue(key+"_ouverture", data.jour_ouverture[key].ouverture);
            formik.setFieldValue(key+"_fermeture", data.jour_ouverture[key].fermeture);

        })
        
        formik.setFieldValue("description", data.description);
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Nos partenaires</h1>
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
                                data-bs-target="#produit"
                                onClick={(e) => formik.resetForm()}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex">
                    <button
                        className="btn btn-primary me-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewType(0);
                        }}
                    >
                        Liste des partenaires
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            setViewType(1);
                        }}
                    >
                        Partenaires bloqués
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Boutique</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                if (data.is_deleted !== viewType) {
                                    return null;
                                }
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            <div className="d-flex">
                                                <img
                                                    width={"64px"}
                                                    src={URL + data.image}
                                                    alt=""
                                                />
                                                <div className="text-100">
                                                    {data.nom_boutique}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{data.telephone_boutique_1}</td>
                                        <td>
                                            <p className="text-200">
                                                {data.description}
                                            </p>
                                        </td>
                                        <td>
                                            {new Date(
                                                data.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-primary-light mx-1 rounded-3"
                                                    onClick={(e) =>
                                                        goToDetail(e, data.slug)
                                                    }
                                                >
                                                    <EyeIcon /> Voir
                                                </button>
                                                <button
                                                    className="btn btn-warning mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#produit"
                                                    onClick={(e) =>
                                                        editData(e, data)
                                                    }
                                                >
                                                    <EditIcon /> Modifier
                                                </button>
                                                <button
                                                    className={`btn mx-1 rounded-3 ${
                                                        data.is_deleted
                                                            ? "btn-success"
                                                            : "btn-danger"
                                                    }`}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                >
                                                    <DeleteIcon />{" "}
                                                    {data.is_deleted
                                                        ? "Activer"
                                                        : "Bloquer"}
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
                className="modal modal-lg fade"
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
                                Ajout d'un nouveau partenaire
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="fw-bold fs-18 mb-3">
                                        Informations du responsable
                                    </div>
                                    <Input
                                        type={"text"}
                                        label="Nom prénom du responsable"
                                        placeholder="Nom prénom du responsable"
                                        name={"nom_responsable"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"email"}
                                        label="Email du responsable"
                                        placeholder="Email du responsable"
                                        name={"email_responsable"}
                                        formik={formik}
                                    />

                                    <Input
                                        type={"text"}
                                        label="Téléphone 1 du responsable"
                                        placeholder="Téléphone 1 du responsable"
                                        name={"telephone_responsable_1"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Téléphone 2 du responsable"
                                        placeholder="Téléphone 2 du responsable"
                                        name={"telephone_responsable_2"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Téléphone 3 du responsable"
                                        placeholder="Téléphone 3 du responsable"
                                        name={"telephone_responsable_3"}
                                        formik={formik}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="fw-bold fs-18 mb-3">
                                        Informations de la boutique
                                    </div>
                                    <Input
                                        type={"text"}
                                        label="Nom de la boutique"
                                        placeholder="Nom de la boutique"
                                        name={"nom_boutique"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"email"}
                                        label="Email de la boutique"
                                        placeholder="Email de la boutique"
                                        name={"email_boutique"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Téléphone 1 de la boutique"
                                        placeholder="Téléphone 1 de la boutique"
                                        name={"telephone_boutique_1"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Téléphone 2 de la boutique"
                                        placeholder="Téléphone 2 de la boutique"
                                        name={"telephone_boutique_2"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Téléphone 3 de la boutique"
                                        placeholder="Téléphone 3 de la boutique"
                                        name={"telephone_boutique_3"}
                                        formik={formik}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center fw-bold fs-18 my-3">
                                    Autres détails de la boutique
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input
                                        type={"text"}
                                        label="Latitude de la boutique"
                                        placeholder="Latitude de la boutique"
                                        name={"latitude"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Longitude de la boutique"
                                        placeholder="Longitude de la boutique"
                                        name={"longitude"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"file"}
                                        label="image de la boutique"
                                        placeholder="image de la boutique"
                                        name={"image"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"textarea"}
                                        label="Description de la boutique"
                                        placeholder="Description de la boutique"
                                        name={"description"}
                                        formik={formik}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Lundi ouverture"
                                                name={"lundi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Lundi fermeture"
                                                name={"lundi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Mardi ouverture"
                                                name={"mardi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Mardi fermeture"
                                                name={"mardi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Mercredi ouverture"
                                                name={"mercredi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Mercredi fermeture"
                                                name={"mercredi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Jeudi ouverture"
                                                name={"jeudi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Jeudi fermeture"
                                                name={"jeudi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Vendredi ouverture"
                                                name={"vendredi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Vendredi fermeture"
                                                name={"vendredi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Samedi ouverture"
                                                name={"samedi_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Samedi fermeture"
                                                name={"samedi_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Dimanche ouverture"
                                                name={"dimanche_ouverture"}
                                                formik={formik}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Input
                                                type={"time"}
                                                label="Dimanche fermeture"
                                                name={"dimanche_fermeture"}
                                                formik={formik}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                Supprimer les données
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
        </>
    );
};
