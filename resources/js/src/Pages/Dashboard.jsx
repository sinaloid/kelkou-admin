import { NavLink, useNavigate } from "react-router-dom";
import { ArticleIcon } from "../assets/icons/ArticleIcon";
import { BackIcon } from "../assets/icons/BackIcon";
import { PeopleIcon } from "../assets/icons/ClientIcon";
import { DashIcon } from "../assets/icons/DashIcon";
import { DeconnectionIcon } from "../assets/icons/DeconnectionIcon";
import { HomeIcon } from "../assets/icons/HomeIcon";
import { LogoIcon } from "../assets/icons/LogoIcon";
import { MenuIcon } from "../assets/icons/MenuIcon";
import { MonCompteIcon } from "../assets/icons/MonCompteIcon";
import { NotificationIcon } from "../assets/icons/NotificationIcon";

import { SuperMarcherIcon } from "../assets/icons/SuperMarcherIcon";
import profile from "../assets/images/profile.png";

import AppRoute from "../routers/AppRoute";
import AppLink from "../routers/AppLink";
import { deleteUser } from "../services/storage";
import { useContext, useEffect } from "react";
import { AppContext, initialUser } from "../services/context";
import { URL } from "../services/request";
import logo from "../assets/images/kelkou.png";


const Dashboard = () => {
  const authCtx = useContext(AppContext);
  const { user, onUserChange } = authCtx;
  const navigate = useNavigate()
  useEffect(() => {
    //return navigate("/dashboard/")
    isAuth();
  }, [user]);

  const isAuth = () => {
    if (user.isAuth == false || user.token == null || user.token == "") {
      console.log(`connexion échoué, isAuth`);
      console.log(user);

      return navigate("/");
    } else {
      console.log("isAuth true");
    }
  };
  const deconnect = () => {
    deleteUser();
    onUserChange(initialUser);
  };

  return (
    <>
      <header
        class="navbar sticky-top bg-dark1 w-100 d-md-none flex-md-nowrap p-0 shadow1"
        data-bs-theme="dark"
        //style=""
      >
        <a
          class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white1"
          href="#"
        >
          KelKou
        </a>

        <ul class="navbar-nav flex-row d-md-none">
          <li class="nav-item text-nowrap">
            <button
              class="nav-link px-3 text-black"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MenuIcon />
            </button>
          </li>
        </ul>

        <div id="navbarSearch" class="navbar-search w-100 collapse">
          <input
            class="form-control w-100 rounded-0 border-0"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </header>

      <div class="container-fluid">
        <div class="row">
          <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary1 bg-white">
            <div
              class="offcanvas-md offcanvas-end bg-body-tertiary1 bg-white"
              tabindex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="sidebarMenuLabel">
                  KelKou
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <div className="d-flex align-items-center px-2 mb-5">
                  <div className="mx-auto">
                    <img width={"100px"} src={logo} alt="logo kelkou" /> <br />
                    <span className="fw-bold">Administration</span>
                  </div>
                </div>
                <ul class="nav flex-column bg-gray mx-2 rounded-3">
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.accueil}
                    >
                      <i class="bi bi-house"></i>
                      Accueil
                    </NavLink>
                  </li>
                </ul>
                <div className="mb-2"></div>
                <ul class="nav flex-column mb-auto bg-gray mx-2 rounded-3 pt-2">
                  <div className="text-start ps-3 fs-10">Supermarchés</div>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.commandes}
                    >
                      <i class="bi bi-file-earmark"></i>
                      Commandes
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.produits}
                    >
                      <i class="bi bi-cart4"></i>
                      Produits
                    </NavLink>
                  </li>
                  
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.categories}
                    >
                      <i class="bi bi-tags"></i>
                      Catégories
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.partenaires}
                    >
                      <i class="bi bi-shop"></i>
                      Partenaires
                    </NavLink>
                  </li>
                  
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.paiements}
                    >
                      <i class="bi bi-credit-card"></i>
                      Paiements
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.clients}
                    >
                      <i class="bi bi-people"></i>
                      Clients
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.livreurs}
                    >
                      <i class="bi bi-truck"></i>
                      Livreurs
                    </NavLink>
                  </li>
                </ul>
                <div className="mb-2"></div>
                <ul class="nav flex-column bg-gray mx-2 rounded-3">
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.personnel}
                    >
                      <i class="bi bi-people"></i>
                      Personnels
                    </NavLink>
                  </li>
                </ul>
                <div className="mb-2"></div>

                <ul class="nav flex-column mb-auto bg-gray mx-2 rounded-3 pt-2">
                  <div className="text-start ps-3 fs-10">Clients</div>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.notifications}
                    >
                      <i class="bi bi-bell"></i>
                      Nofications
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active text-white"
                        }`
                      }
                      to={AppLink.boiteReception}
                    >
                      <i class="bi bi-chat-right-dots"></i>
                      Messages
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${
                          isActive && "active"
                        }`
                      }
                      to={AppLink.monCompte}
                    >
                      <MonCompteIcon />
                      Mon compte
                    </NavLink>
                  </li>
                  <div className="mb-2"></div>

                  <li class="nav-item bg-danger rounded-3">
                    <span
                      class="nav-link d-flex align-items-center gap-2 text-white"
                      onClick={deconnect}
                    >
                      <DeconnectionIcon />
                      Déconnection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <span>
                <BackIcon /> retour
              </span>
              <div class="d-flex align-items-center mb-2 mb-md-0">
                <div className="text-end me-2">
                  <span className="fw-bold">Jeanne SAWADOGO</span> <br />
                  <span className="text-muted">#jeanne_saw</span>
                </div>
                <div className="text-end d-inline-block rounded-circle p-1 border border-5">
                  <img className="rounded-circle" width={"100px"} src={URL+"users/profile/"+user.photo} alt="" />
                </div>
              </div>
            </div>
            <AppRoute type={"dashboard"} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
