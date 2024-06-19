import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actions";
import { Link } from "react-router-dom";

const Login = function ({ onCloseLogin, onShowRegister }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

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

  const clickToShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/profile/reset-password", { email: formData.email, new_passord: formData.new_passord })
      .then((response) => {
        alert(response.data.message);
        setShowResetForm(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="login-big-cont">
      <div className="login-container">
        <form onSubmit={(e) => submitLogin(e)} noValidate>
          <div className="input-field login">
            <label htmlFor="email">Email</label>
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
          <div className="input-field login pos-rel-pass">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => updateInputValue(e)}
              value={formData.password}
              required
            />
            <div className="btn-show-pass-login">
              <button className="btn-none" onClick={clickToShowPass}>
                <img src={showPassword ? "/icons/eye.svg" : "/icons/eye-slash.svg"} alt="" />
              </button>
            </div>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Ricordami</label>
          </div>
          <div>
            <button onClick={() => setShowResetForm(true)}>Password dimenticata</button>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="login-btn">
              ACCEDI
            </button>
          </div>
        </form>
        <div className="register">
          <span className="not-register">NON SEI ANCORA REGISTRATO?</span>
          <button onClick={onShowRegister} className="register-btn">
            REGISTRATI
          </button>
        </div>
        {showResetForm && (
          <form onSubmit={handleForgotPassword} noValidate>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={updateInputValue}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword">Nuova password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="newPassword"
                name="newPassword"
                onChange={updateInputValue}
                value={formData.newPassword}
                required
              />
            </div>
            <div className="btn-show-pass-login">
              <button className="btn-none" onClick={clickToShowPass}>
                <img src={showPassword ? "/icons/eye.svg" : "/icons/eye-slash.svg"} alt="" />
              </button>
            </div>
            <div>
              <button type="submit" className="login-btn">
                Resetta password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
