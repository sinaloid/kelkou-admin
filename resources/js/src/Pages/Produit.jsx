import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EditIcon } from "../assets/icons/EditIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { PrevIcon } from "../assets/icons/PrevIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { SuivIcon } from "../assets/icons/SuivIcon";
import endPoint from "../services/endPoint";
import request from "../services/request";
import { Input } from "../components/Input";
import { useFormik } from "formik";
import { pagination } from "../services/function";

const initProduit = {
  label: "",
  code: "",
  description: "",
  categories: "",
  prix: "",
  image: "",
  boutiqueId: 1,
};
export const Produit = () => {
  const [datas, setDatas] = useState({
    all: [],
    small: [],
  });
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState({
    list: [],
    counter: 0,
    index: 0,
  });
  const close = useRef();
  useEffect(() => {
    get();
    getCategories();
  }, []);
  const formik = useFormik({
    initialValues: initProduit,
    onSubmit: (values) => {
      console.log(values);
      post(values);
    },
  });
  const get = () => {
    request
      .get(endPoint.produits + "/1/boutiques")
      .then((res) => {
        const tab = pagination(res.data.produits.data, 10);

        console.log(tab);

        if (tab.counter !== 0) {
          setDatas({
            all: res.data.produits.data,
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
  const getCategories = () => {
    request
      .get(endPoint.categories)
      .then((res) => {
        console.log(res.data.categories.data);
        setCategories(res.data.categories.data);
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
                <span className="ms-2" onClick={(e) => changePage(e, "-1")}>
                  <PrevIcon />
                </span>
                <span className="ms-2" onClick={(e) => changePage(e, "+1")}>
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
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-12 row-cols-md-4 g-4">
        {[...Array(11).keys()].map((data, idx) => {
          return (
            <div className="col mb-3" key={idx}>
              <div className="card">
                <div className="position-relative">
                <img
                  width={"100%"}
                  src={
                    "https://source.unsplash.com/random/800x800/?product=" + idx
                  }
                />
                <span className="position-absolute bg-primary px-1 fw-bold" style={{right:"0", top:"0"}}>Stock 15</span>
                </div>
                <div className="p-2">
                <span className="d-block fs-18 text-start">Nom du produit</span>
                <span className="d-block fs-10 text-start">
                  Nom de la catégorie
                </span>
                <span className="d-block fs-18 text-start">Xof 1500</span>
                <div className="d-flex">
                  <span className="ms-auto btn btn-primary mx-1">
                    <i class="bi bi-eye"></i>
                  </span>
                  <span className="btn btn-warning mx-1">
                    <i class="bi bi-pencil-square"></i>
                  </span>
                  <span className="btn btn-danger mx-1 ">
                    <i class="bi bi-trash"></i>
                  </span>
                </div>
                </div>
              </div>
            </div>
          );
        })}
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                placeholder="Label du produit"
                name={"label"}
                formik={formik}
              />
              <Input
                type={"text"}
                placeholder="Code du produit"
                name={"code"}
                formik={formik}
              />
              <Input
                type={"text"}
                placeholder="Description du produit"
                name={"description"}
                formik={formik}
              />
              <Input
                type={"text"}
                placeholder="Prix du produit"
                name={"prix"}
                formik={formik}
              />
              <Input
                type={"select"}
                placeholder="categories du produit"
                name={"categories"}
                formik={formik}
                options={categories}
              />
              <Input
                type={"file"}
                placeholder="image du produit"
                name={"image"}
                formik={formik}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
