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

const initData = {
    lastname: "",
    firstname: "",
    birthday: "",
    type: "",
    slug: "",
    image: "",
    isActive: "",
    role: "",
    number: "",
    number_1: "",
    number_2: "",
    genre: "",
    email: "",
    password: "",
};

export const Personnel = () => {
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
    const closeRole = useRef();
    const [detail, setDetail] = useState("");
    const [viewData, setViewData] = useState({});
    useEffect(() => {
        get();
    }, []);
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            values.type = "personnel";
            if (values.password === "") {
                values.password = null;
            }
            if (values.slug) {
                update(values);
            } else {
                values.partenaire = detail.slug;
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
            .get(endPoint.users + "/personnel")
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

    const post = (values) => {
        request
            .post(endPoint.register, values)
            .then((res) => {
                console.log(res.data);
                close.current.click();
                get();
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
            .post(endPoint.users + "/update/" + values.slug, values)
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
            .post(endPoint.users + "/disable", { id: viewData.id })
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
        //formik.setFieldValue("_method", "put");
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("lastname", data.lastname);
        formik.setFieldValue("firstname", data.firstname);
        formik.setFieldValue("birthday", data.birthday);
        formik.setFieldValue("number", data.number);
        formik.setFieldValue("email", data.email);
        formik.setFieldValue("genre", data.genre);
        formik.setFieldValue("password", "");
    };
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Le personnel</h1>
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
                                <th scope="col">Nom Prénom</th>
                                <th scope="col">Role</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Etat du compte</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.small.map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>
                                            {data.lastname +
                                                " " +
                                                data.firstname}
                                        </td>
                                        <td>{data.role}</td>
                                        <td>{data.number}</td>
                                        <td>Homme</td>
                                        <td>
                                            {data.isActive === "1"
                                                ? <> <span className="badge text-bg-success">Actif</span></>
                                                :  <> <span className="badge text-bg-danger">Inactif</span></>}
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
                                                    className="btn btn-primary-light mx-1 rounded-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#role"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                >
                                                    <EyeIcon /> Role
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
                                                    
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete"
                                                    onClick={(e) =>
                                                        onSelectData(e, data)
                                                    }
                                                    className={data.isActive === "1" ? "btn btn-danger mx-1 rounded-3 " : "btn btn-success mx-1 rounded-3"}
                                                >
                                                    <DeleteIcon />{" "}
                                                    {data.isActive === "1"
                                                        ? "Desactiver"
                                                        : "Activer"}
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
                                Ajout de personnel
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
                                placeholder="Nom"
                                name={"lastname"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Prénom"
                                name={"firstname"}
                                formik={formik}
                            />
                            <Input
                                type={"date"}
                                placeholder="Date de naissance"
                                name={"birthday"}
                                formik={formik}
                            />
                            <Input
                                type={"email"}
                                placeholder="Email "
                                name={"email"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Numéro de téléphone 1"
                                name={"number"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Numéro de téléphone 2"
                                name={"number_1"}
                                formik={formik}
                            />
                            <Input
                                type={"text"}
                                placeholder="Numéro de téléphone 3"
                                name={"number_2"}
                                formik={formik}
                            />

                            <Input
                                type={"select"}
                                placeholder="Genre"
                                name={"genre"}
                                formik={formik}
                                options={[
                                    { slug: "Homme", nom: "Homme" },
                                    {
                                        slug: "Femme",
                                        nom: "Femme",
                                    },
                                ]}
                            />

                            <Input
                                type={"password"}
                                placeholder="Mot de passe"
                                name={"password"}
                                formik={formik}
                            />

                            <Input
                                type={"file"}
                                placeholder="Image"
                                name={"image"}
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
                                {viewData.isActive === "1" ? "Desactivation de compte " : " Activation de compte"}
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
                id="role"
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
                                Changement de role
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="mb-2">Attribution de role</div>
                            <Input
                                type={"select"}
                                placeholder="Role"
                                name={"role"}
                                formik={formikRole}
                                options={[
                                    { slug: "secretaire", nom: "Secretaire" },
                                    { slug: "comptable",nom: "Comptable",},
                                    { slug: "gestionnaire",nom: "Gestionnaire",},
                                ]}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={closeRole}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={formikRole.handleSubmit}
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
