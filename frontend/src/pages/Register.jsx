import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Register = function ({ onCloseRegister, modalShow, show }) {
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_img: "",
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
        body.append("profile_img", profileImg);
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
    <>
      <Modal show={show} onHide={modalShow}>
        <Modal.Header>
          <Modal.Title>REGISTRAZIONE</Modal.Title>
          <div className="register-x-button">
            <button onClick={onCloseRegister} className="btn-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => submitRegister(e)} noValidate>
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
                // value={formData.profile_img}
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
