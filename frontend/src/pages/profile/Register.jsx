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
    // profile_img: "",
  });

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
    <div className="container">
      <div className="row">
        <div className="col-9">
          <form onSubmit={(e) => submitRegister(e)} method="POST" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome utente
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={(e) => updateInputValue(e)}
                value={formData.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={(e) => updateInputValue(e)}
                value={formData.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={(e) => updateInputValue(e)}
                value={formData.password}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Conferma password
              </label>
              <input
                type="password"
                className="form-control"
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
                className="form-control"
                id="profile_img"
                name="profile_img"
                onChange={updateImageField}
              />
              {profileImg && <img src={URL.createObjectURL(profileImg)} alt="" style={{ width: "100%" }} />}
            </div>
            <div className="spessor"></div>
            <div className="register-form-btn">
              <button type="submit" className="btn btn-primary">
                Registrati
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
