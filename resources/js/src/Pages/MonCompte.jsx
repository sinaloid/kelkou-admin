
import { useFormik } from "formik";
import { Input } from "../components/Input";

export const MonCompte = () => {

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
      //post(values);
    },
  });

  return (
    <>
      <div className="row">
        <h1 className="h2">Paramètres de mon compte</h1>
      </div>
      <div className="row my-4">
        <div className="col-12 col-md-5 col-lg-4">
          <img
            width="100%"
            src={"https://source.unsplash.com/random/800x800/?profile=1"}
            alt=""
          />
          <div className="my-3">
            <button
              className="btn btn-primary me-2 w-75"
              data-bs-dismiss="modal"
            >
              Modifier la photo
            </button>
            <img src={"del"} alt="" />
          </div>
          <div className="border border-1 p-4 mt-4">
            <p className="text-16 text-bold">Autres actions</p>
            <p className="text-start">Ancien mot de passe</p>
            <Input
              type={"text"}
              placeholder="profile"
              name={"oldPassword"}
              formik={formik}
            />
            <p className="text-start">Nouveau mot de passe</p>
            <Input
              type={"text"}
              placeholder="profile"
              name={"newPassword"}
              formik={formik}
            />
            <button
              className="btn border border-1 my-2 w-100"
              data-bs-dismiss="modal"
            >
              Modification du mot de passe
            </button>
            {/*<button
              className="btn border border-1 my-2 w-100"
              data-bs-dismiss="modal"
            
              >
              Aide et support
            </button>
            <button
              className="btn border border-1 my-2 w-100"
              data-bs-dismiss="modal"
            >
              Conditions d’utilisation
            </button>*/}
          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-6 mx-auto border border-1 p-4">
          <p className="text-16 text-bold">Mes informations personnelles</p>
          <form className="w-100" action="">
            <>
              <p className="text-start">Nom</p>
              <Input
                type={"text"}
                placeholder="nom"
                name={"nom"}
                formik={formik}
              />
              <p className="text-start">Prenom</p>
              <Input
                type={"text"}
                placeholder="prenom"
                name={"prenom"}
                formik={formik}
              />
              <p className="text-start">Email</p>
              <Input
                type={"text"}
                placeholder="email"
                name={"email"}
                formik={formik}
              />
              <p className="text-start">Structure</p>
              <Input
                type={"text"}
                placeholder="structure"
                name={"structure"}
                formik={formik}
              />
              <p className="text-start">Profile</p>
              <Input
                type={"text"}
                placeholder="profile"
                name={"profile"}
                formik={formik}
              />
              <p className="text-start">Genre</p>
              <Input
                type={"text"}
                placeholder="genre"
                name={"genre"}
                formik={formik}
              />
              <p className="text-start">Téléphone</p>
              <Input
                type={"text"}
                placeholder="tel"
                name={"tel"}
                formik={formik}
              />
              <div className="d-flex justify-content-center1">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  // onClick={formik.handleSubmit}
                >
                  Enregistrer
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
};
