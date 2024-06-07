import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";

const Login = function ({ onCloseLogin, onShowRegister }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLogin = (e) => {
    e.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
      })
      .catch((error) => console.log("Errore", error));
  };

  return (
    <div className="login-big-cont">
      <div className="login-container">
        <form onSubmit={(e) => submitLogin(e)} noValidate>
          <div className="input-field">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => updateInputValue(e)}
              value={formData.email}
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => updateInputValue(e)}
              value={formData.password}
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Ricordami</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Accedi
          </button>
        </form>
        <div className="register">
          <span>NON SEI ANCORA REGISTRATO?</span>
          <button onClick={onShowRegister}>Registrati</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
