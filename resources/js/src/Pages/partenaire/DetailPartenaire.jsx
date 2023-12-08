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
import { useParams } from "react-router-dom";
import { Video } from "../../components/Video";
import ReactPlayer from "react-player";
import rect from "../../assets/images/rect.png";

const initData = {
    nom: "",
    prix: "",
    stock: "",
    image: "",
    disponibilite: "",
    dure_livraison: "",
    description: "",
    partenaire: "",
    categorie: "",
};
export const DetailPartenaire = () => {
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
    const { slug } = useParams();
    const [viewVideo, setViewVideo] = useState(false);
    useEffect(() => {
        get();
        getCategorie();
    }, []);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            if (values.slug) {
                update(values);
            } else {
                values.partenaire = detail.slug;
                post(values);
            }
        },
    });

    const get = () => {
        request
            .get(endPoint.partenaires + "/" + slug)
            .then((res) => {
                console.log(res.data.data);
                setDetail(res.data.data);
                const tab = pagination(res.data.data.produits, 10);

                //console.log(tab);

                if (tab.counter !== 0) {
                    setDatas({
                        all: res.data.data.produits,
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
                console.log(res.data.data);
                setCategories(res.data.data);
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
        //setVideoUrl(URL + data.video);
        console.log(data);
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
        formik.setFieldValue("categorie", data.categorie.slug);
        formik.setFieldValue("description", data.description);
    };
    return (
        <>
            <div className="row mb-5">
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <img
                            className="me-3"
                            width={"160px"}
                            src={URL + detail.image}
                            alt=""
                        />
                        <div className="me-3 text-start">
                            <div className="bg-gray">
                                <span className="fw-bold">
                                    Informations de la boutique
                                </span>
                            </div>
                            <div className="me-4">
                                <span className="fw-bold fs-40">
                                    {detail.nom_boutique}
                                </span>
                                <br />
                                <span>Email boutique : </span>
                                <span className="fw-bold">
                                    {detail.email_boutique}
                                </span>{" "}
                                <br />
                                <span>Téléphone boutique : </span>
                                <div className="fw-bold">
                                    <span>{detail.telephone_boutique_1}</span>{" "}
                                    <br />
                                    <span>
                                        {detail.telephone_boutique_2}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {detail.telephone_boutique_3}
                                    </span>{" "}
                                    <br />
                                </div>{" "}
                            </div>
                        </div>
                        <div className="me-3 text-start">
                            <div className="bg-gray">
                                <span className="fw-bold">
                                    Informations du responsable
                                </span>
                            </div>
                            <div className="text-start">
                                <span className="fw-bold fs-40">
                                    {detail.nom_responsable}
                                </span>{" "}
                                <br />
                                <span>Email responsable: </span>
                                <span className="fw-bold">
                                    {detail.email_responsable}
                                </span>{" "}
                                <br />
                                <div className="">Téléphone responsable: </div>
                                <div className="d-inline-block fw-bold">
                                    <span>
                                        {detail.telephone_responsable_1}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {detail.telephone_responsable_2}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {detail.telephone_responsable_3}
                                    </span>{" "}
                                    <br />
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-start">
                    <div className="text-muted">
                        Créer le :{" "}
                        {new Date(detail.created_at).toLocaleDateString()}
                    </div>
                    <div>
                        <div className="d-inline-block me-2">
                            <span>Heure début : </span>{" "}
                            <span className="fw-bold">
                                {detail.heure_ouverture}
                            </span>
                        </div>
                        <div className="d-inline-block me-2">
                            <span>Heure femeture : </span>{" "}
                            <span className="fw-bold">
                                {detail.heure_fermeture}
                            </span>
                        </div>
                    </div>
                    <p className="text-start">{detail.description}</p>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3 fs-30">
                        Liste des produits de la boutique
                    </h1>
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
                                <th scope="col">Catégories</th>
                                <th scope="col">Quantité min</th>
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
                                                />
                                                <div className="text-100">
                                                    {data.nom}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-200">
                                                {data.quantite_min}
                                            </p>
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
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
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
                                Ajout d'un nouveau produit
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
                                placeholder="Nom du produit"
                                name={"nom"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Prix du produit"
                                name={"prix"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Quantité en stock"
                                name={"stock"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Dure de livraison du produit"
                                name={"dure_livraison"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Quantite minimum du produit"
                                name={"quantite_min"}
                                formik={formik}
                            />
                            <Input
                                type={"select"}
                                placeholder="Disponibilié du produit"
                                name={"disponibilite"}
                                formik={formik}
                                options={[
                                    { slug: "immediate", nom: "Immediate" },
                                    {
                                        slug: "sur commande",
                                        nom: "Sur commande",
                                    },
                                ]}
                            />
                            <Input
                                type={"select2"}
                                placeholder="Catégorie du produit"
                                name={"categorie"}
                                formik={formik}
                                options={categories}
                            />
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
                            <div className="d-flex1">
                                <div className="d-flex flex-wrap mb-3">
                                    {viewData.produit_images.map((data) => {
                                        return (
                                            <span className="me-2">
                                                <img
                                                    width={"180px"}
                                                    height={"180px"}
                                                    src={URL + data.url}
                                                    alt=""
                                                />
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className="ps-3 w-100">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <span className="fw-bold fs-20">
                                                {viewData.nom}
                                            </span>
                                            <br />
                                            <span className="text-muted">
                                                {viewData.categorie?.nom}
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
                                        <span>Prix : </span>
                                        <span className="fw-bold">
                                            {viewData.prix + " Xof"}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Stock : </span>
                                        <span className="fw-bold">
                                            {viewData.stock}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Quantité min : </span>
                                        <span className="fw-bold">
                                            {viewData.quantite_min +
                                                " produit(s)"}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Disponiblilité : </span>
                                        <span className="fw-bold">
                                            {viewData.disponibilite}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Durée de la livraison : </span>
                                        <span className="fw-bold">
                                            {viewData.dure_livraison +
                                                " jour(s)"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="fw-bold">
                                            Description :{" "}
                                        </span>
                                        <p>{viewData.description}</p>
                                    </div>
                                </div>

                                <div>
                                    {viewData.video && (
                                        <ReactPlayer
                                            url={URL + viewData.video}
                                            controls={true}
                                            width={"100%"}
                                        />
                                    )}
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
        </>
    );
};
