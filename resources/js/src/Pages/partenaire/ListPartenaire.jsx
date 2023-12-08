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
    longitute: "",
    heure_ouverture: "",
    heure_fermeture: "",
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
    const navigate = useNavigate();
    const close = useRef();
    const closeDelete = useRef();
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
                post(values);
            }
        },
    });
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
        formik.setFieldValue("telephone_responsable_1", data.telephone_responsable_1);
        formik.setFieldValue("telephone_responsable_2", data.telephone_responsable_2);
        formik.setFieldValue("telephone_responsable_3", data.telephone_responsable_3);
        formik.setFieldValue("nom_boutique", data.nom_boutique);
        formik.setFieldValue("email_boutique", data.email_boutique);
        formik.setFieldValue("telephone_boutique_1", data.telephone_boutique_1);
        formik.setFieldValue("telephone_boutique_2", data.telephone_boutique_2);
        formik.setFieldValue("telephone_boutique_3", data.telephone_boutique_3);
        formik.setFieldValue("latitude", data.latitude);
        formik.setFieldValue("longitute", data.longitute);
        formik.setFieldValue("heure_ouverture", data.heure_ouverture);
        formik.setFieldValue("heure_fermeture", data.heure_fermeture);
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
                                onClick={e => formik.resetForm()}
                            >
                                Ajouter
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
                                <th scope="col">Boutique</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                if (data.is_deleted) {
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
                                        <td>
                                            {data.telephone_boutique_1}
                                        </td>
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
                                                    className="btn btn-danger mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
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
                                Ajout d'un nouveau partenaire
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
                                placeholder="Nom prénom du responsable"
                                name={"nom_responsable"}
                                formik={formik}
                            />
                            <Input
                                type={"email"}
                                placeholder="Email du responsable"
                                name={"email_responsable"}
                                formik={formik}
                            />
                            
                            <Input
                                type={"text"}
                                placeholder="Téléphone 1 du responsable"
                                name={"telephone_responsable_1"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Téléphone 2 du responsable"
                                name={"telephone_responsable_2"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Téléphone 3 du responsable"
                                name={"telephone_responsable_3"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Nom de la boutique"
                                name={"nom_boutique"}
                                formik={formik}
                            />
                            <Input
                                type={"email"}
                                placeholder="Email de la boutique"
                                name={"email_boutique"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Téléphone 1 de la boutique"
                                name={"telephone_boutique_1"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Téléphone 2 de la boutique"
                                name={"telephone_boutique_2"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Téléphone 3 de la boutique"
                                name={"telephone_boutique_3"}
                                formik={formik}
                            />
                            <Input
                                type={"time"}
                                placeholder="Téléphone 3 de la boutique"
                                name={"heure_ouverture"}
                                formik={formik}
                            />
                            <Input
                                type={"time"}
                                placeholder="Téléphone 3 de la boutique"
                                name={"heure_fermeture"}
                                formik={formik}
                            />
                            <Input
                                type={"file"}
                                placeholder="image de la boutique"
                                name={"image"}
                                formik={formik}
                            />
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
