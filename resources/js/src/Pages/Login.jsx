import { useNavigate } from "react-router-dom";
import logo from "../assets/images/kelkou.png";
import AppLink from "../routers/AppLink";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { useFormik } from "formik";
import { Input } from "../components/Input";
import { useContext, useEffect } from "react";
import { AppContext } from "../services/context";

const initLogin = {
  login: "severin.dembele@essitechgroup.com",
  password: "oyt-IfXY3zVW50X",
};
export const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AppContext);
  const { user, onUserChange } = authCtx;
  useEffect(() => {
    isAuth();
  }, [user.isAuth]);
  const formik = useFormik({
    initialValues: initLogin,
    onSubmit: (values) => {
      console.log(values);
      login(values);
    },
  });

  const login = (values) => {
    request
      .post(endPoint.login, values)
      .then((res) => {
        console.log(res.data);
        onUserChange({
          isAuth: true,
          type: "",
          //name: res.data.user.nom + " " + res.data.user.prenom,
          photo: res.data.user.photo,
          role: res.data.user.role,
          isActive: res.data.user.isActive,
          //roles: res.data.roles,
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        isAuth();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isAuth = () => {
    if (user.isAuth === true && user.token != null && user.token !== "") {
      console.log(`connexion reussi, isAuth: ${user}`);
      console.log(user);

      return navigate(AppLink.dashboard + "/" + AppLink.accueil);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 mx-auto">
          <div className="h-100 pt-5 position-relative">
            <div className="text-start">
              <img width="100px" src={logo} alt="login image" />
              <h1>Connexion</h1>
              <p>Heureux de vous revoir</p>
            </div>
            <Input
              type={"text"}
              placeholder="Email"
              name={"login"}
              formik={formik}
            />
            <Input
              type={"password"}
              placeholder="Mot de passe"
              name={"password"}
              formik={formik}
            />
            <button
              className="btn btn-primary w-100"
              onClick={formik.handleSubmit}
            >
              Se connecter
            </button>
            <p className="text-start mt-3">
              En cas de perte du mot de passe, veuillez contacter un
              administrateur
            </p>
            <p className="position-absolute1 bottom-01 mt-5">
              © 2023 Mycourses.com. Tous droits reservés.
            </p>
          </div>
        </div>
        {/**
           * <div className="d-none d-md-block col-md-9 px-0">
          <div className="login-img-container overflow-hidden">
            <img className="login-img" src={login} alt="login image" />
          </div>
        </div>
           */}
      </div>
    </div>
  );
};
