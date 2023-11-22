import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";
import { useEffect, useRef, useState } from "react";
import endPoint from "../services/endPoint";
import { pagination } from "../services/function";
import request, { URL } from "../services/request";


export const Livreur = () => {
    const [datas, setDatas] = useState({
        all: [],
        small: [],
    });
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
        index: 0,
    });
    const closeDelete = useRef();
    const [viewData, setViewData] = useState({});
    useEffect(() => {
        get();
    }, []);
    

    const get = () => {
        request
            .get(endPoint.users + "/livreur")
            .then((res) => {
                console.log(res.data.data);
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
    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <h1 className="text-start mb-3">Nos livreurs</h1>
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
                                <th scope="col">Compte</th>
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
                                        <td>{data.type}</td>
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
                                    <div>
                                        <span>Immatriculation : </span>
                                        <span className="fw-bold">
                                            {viewData.engin_immatriculation}
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
        </>
    );
};
