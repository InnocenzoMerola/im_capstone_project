import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actions";

const Register = function () {
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateImageField = (e) => {
    updateInputValue(e);
    setProfileImg(e.target.files[0]);
  };

  const clickToShowPass = () => {
    setShowPassword(!showPassword);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    console.log("ciao");
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);
        if (profileImg) {
          body.append("profile_img", profileImg);
        }

        console.log(...body);

        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
      })
      .catch((error) => console.log("Errore durande la registrazione", error));
  };

  return (
    <div className="register-total-page">
      <div className="container">
        <div className="row justify-content-center shadow-div">
          <div className="col-12 col-md-7 d-flex justify-content-center register-div">
            <div>
              <h1 className="text-center">Ciao, utente</h1>
              <form onSubmit={(e) => submitRegister(e)} method="POST" noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome utente
                  </label>
                  <input
                    type="text"
                    className="form-control reg-form"
                    id="name"
                    name="name"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name}
                    aria-label="Nome utente"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control reg-form"
                    id="email"
                    name="email"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="mb-3 pos-rel-pass">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control reg-form"
                    id="password"
                    name="password"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.password}
                    required
                  />
                  <div className="btn-show-pass">
                    <button className="btn-none" onClick={clickToShowPass}>
                      <img src={showPassword ? "/icons/eye.svg" : "/icons/eye-slash.svg"} alt="" />
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    Conferma password
                  </label>
                  <input
                    type="password"
                    className="form-control reg-form"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.password_confirmation}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="profile_img" className="form-label">
                    Immagine profilo
                  </label>
                  <input
                    type="file"
                    className="form-control reg-form"
                    id="profile_img"
                    name="profile_img"
                    onChange={updateImageField}
                  />
                </div>
                <div className="register-form-btn">
                  <button type="submit">REGISTRATI</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-5 side-register">
            <h2>Benvenuto</h2>
            <p className="text-center">
              Ti diamo il benvenuto nella meravigliosa Napoli, dove ogni strada e piazza sono testimoni di una storia
              millenaria e di una cultura vibrante. Unisciti a noi nel viaggio alla scoperta dei luoghi più affascinanti
              e nascosti di questa città, pronti a raccontarti le loro storie e a incantarti con la loro bellezza senza
              tempo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
