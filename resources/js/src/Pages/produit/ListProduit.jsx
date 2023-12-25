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
import ReactPlayer from "react-player";
import rect from "../../assets/images/rect.png";
import { useNavigate } from "react-router-dom";

const initData = {
    nom: "",
    prix: "",
    stock: "",
    files: "",
    disponibilite: "",
    dure_livraison: "",
    quantite_min: "",
    video: "",
    description: "",
    partenaire: "",
    categorie: "",
    taille: "",
    couleur: "",
};
export const ListProduit = () => {
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const [categories, setCategories] = useState([]);
    const close = useRef();
    const closeDelete = useRef();
    const [detail, setDetail] = useState("");
    const [viewData, setViewData] = useState({ produit_images: [] });
    const [partenaires, setPartenaires] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        get();
        getCategorie();
        getPartenaire();
    }, []);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            const newValues = variante(values);
            console.log(newValues);

            if (values.slug) {
                update(newValues);
            } else {
                post(newValues);
            }
        },
    });

    const variante = (values) => {
        const variante = {
            taille: values.taille,
            couleur: values.couleur,
        };

        values.variante = JSON.stringify(variante);

        return values;
    };

    const get = () => {
        request
            .get(endPoint.produits)
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data);
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

    const getCategorie = () => {
        request
            .get(endPoint.categories)
            .then((res) => {
                //console.log(res.data.data);
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getPartenaire = () => {
        request
            .get(endPoint.partenaires)
            .then((res) => {
               // console.log(res.data.data);
                setPartenaires(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = (values) => {
        request
            .post(endPoint.produits, values)
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
        console.log(values);
        request
            .post(endPoint.produits + "/" + values.slug, values)
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
            .delete(endPoint.produits + "/" + viewData.slug)
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
        formik.setFieldValue("nom", data.nom);
        formik.setFieldValue("prix", data.prix);
        formik.setFieldValue("stock", data.stock);
        formik.setFieldValue("disponibilite", data.disponibilite);
        formik.setFieldValue("dure_livraison", data.dure_livraison);
        formik.setFieldValue("quantite_min", data.quantite_min);
        formik.setFieldValue("categorie", data.categorie.slug);
        formik.setFieldValue("description", data.description);
        data.variante = JSON.parse(data.variante)

        formik.setFieldValue("taille", data.variante.taille);
        formik.setFieldValue("couleur", data.variante.couleur);
    };
    const goToDetail = (e, slug) => {
        e.preventDefault();
        navigate("detail/" + slug);
    };
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Mes produits</h1>
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
                <div className="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Etat promotion</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                if (data.is_deleted) {
                                    return null;
                                }
                                const img =
                                    data.produit_images.length !== 0
                                        ? URL + data.produit_images[0].url
                                        : rect;
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            <div className="d-flex">
                                                <img
                                                    width={"64px"}
                                                    src={img}
                                                    alt=""
                                                    className="me-2"
                                                />
                                                <div className="text-100">
                                                    <span className="d-block fs-18 text-start">
                                                        {data.nom}
                                                    </span>
                                                    <span className="d-block fs-10 text-start">
                                                        {data.categorie.nom}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{data.prix + " Xof"}</td>
                                        <td>{data.stock}</td>
                                        <td>{data.etat_promotion}</td>
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
                                Ajout d'un nouveau produit
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
                                    <Input
                                        type={"text"}
                                        label="Nom du produit"
                                        placeholder="Nom du produit"
                                        name={"nom"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Prix du produit"
                                        placeholder="Prix du produit"
                                        name={"prix"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Quantité en stock"
                                        placeholder="Quantité en stock"
                                        name={"stock"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Quantité en minimum du produit"
                                        placeholder="Quantité en minimum du produit"
                                        name={"quantite_min"}
                                        formik={formik}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input
                                        type={"files"}
                                        label="Images du produit"
                                        placeholder="Images du produit"
                                        name={"files"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"file"}
                                        label="Courte video du produit"
                                        placeholder="Courte video du produit"
                                        name={"video"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"textarea"}
                                        label="Description du produit"
                                        placeholder="Description du produit"
                                        name={"description"}
                                        formik={formik}
                                    />
                                </div>
                            </div>
                            <div className="row border-top pt-3">
                                <div className="col-12 col-md-6">
                                    <Input
                                        type={"select"}
                                        label="Disponibilié du produit"
                                        placeholder="Disponibilié du produit"
                                        name={"disponibilite"}
                                        formik={formik}
                                        options={[
                                            {
                                                slug: "immediate",
                                                nom: "Immediate",
                                            },
                                            {
                                                slug: "sur commande",
                                                nom: "Sur commande",
                                            },
                                        ]}
                                    />
                                    {formik.values["disponibilite"] === "sur commande" && (
                                        <>
                                            <Input
                                                type={"text"}
                                                label="Dure de livraison du produit"
                                                placeholder="Dure de livraison du produit"
                                                name={"dure_livraison"}
                                                formik={formik}
                                            />
                                        </>
                                    )}

                                    <Input
                                        type={"select-partenaire"}
                                        label="Propriétaire du produit"
                                        placeholder="Propriétaire du produit"
                                        name={"partenaire"}
                                        formik={formik}
                                        options={partenaires}
                                    />
                                    <Input
                                        type={"select2"}
                                        label="Catégorie du produit"
                                        placeholder="Catégorie du produit"
                                        name={"categorie"}
                                        formik={formik}
                                        options={categories}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input
                                        type={"text"}
                                        label="Taille"
                                        placeholder="Taille du produit"
                                        name={"taille"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        label="Couleur"
                                        placeholder="Couleur du produit"
                                        name={"couleur"}
                                        formik={formik}
                                    />
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
            <div
                className="modal fade"
                id="promotion"
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
                                Ajout le produit en promotion
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <span className="d-block mb-3">
                                Date de debut de la promotion
                            </span>
                            <Input
                                type={"date"}
                                placeholder="Date de debut de la promotion"
                                name={"dateDebut"}
                                formik={formik}
                            />
                            <span className="d-block mb-3">
                                Date de fin de la promotion
                            </span>
                            <Input
                                type={"date"}
                                placeholder="Date de fin de la promotion"
                                name={"dateFin"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                label="Prix promotion"
                                placeholder="Prix promotion"
                                name={"prixPromotion"}
                                formik={formik}
                            />
                            <Input
                                type={"select"}
                                label="Type de la promotion"
                                placeholder="Type de la promotion"
                                name={"type"}
                                formik={formik}
                                options={[
                                    { slug: "Promotion", nom: "Promotion" },
                                    {
                                        slug: "Vente chaude",
                                        nom: "Vente chaude",
                                    },
                                ]}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                //ref={closePromo}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                //onClick={formikPromo.handleSubmit}
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
