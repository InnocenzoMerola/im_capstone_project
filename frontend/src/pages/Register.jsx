import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";

const Register = function () {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_img: "",
  });

  //   const [errors, setErrors] = useState(null);

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

  const submitLogin = (e) => {
    e.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);
        body.append("profile_img", profileImg);
        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
      });
  };

  return (
    <form onSubmit={(e) => submitLogin(e)} noValidate>
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
          onChange={(e) => updateImageField(e)}
          value={formData.profile_img}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Registrati
      </button>
    </form>
  );
};

export default Register;
