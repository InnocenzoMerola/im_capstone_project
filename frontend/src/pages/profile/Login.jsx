import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../traductions/LanguageContext";
import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";
import { Spinner } from "react-bootstrap";

const Login = function ({ onCloseLogin, onShowRegister }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswrodForm, setShowForgotPasswordForm] = useState(false);
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

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
    setLoading(true);

    axios
      .get("/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() =>
        axios.post("/login", formData, {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          },
          withCredentials: true,
        })
      )
      .then(() => axios.get("/api/user"))
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Username o password errate");
        }
        setMessage("");
        setLoading(false);
      });
  };

  // async function submitLogin() {
  //   await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
  //     withCredentials: true,
  //   });

  //   await axios.post(
  //     "http://localhost:8000/login",
  //     {
  //       email: formData.email,
  //       password: formData.password,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
  //       },
  //       withCredentials: true,
  //     }
  //   );
  // }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const clickToShowPass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/forgot-password", { email });
      setMessage(response.data.status);
      setError("");
      setShowForgotPasswordForm(false);
      console.log(email);
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.email) {
        setError(error.response.data.error.email);
      } else {
        setError("Qualcosa è andato storto, riprova più tardi");
      }
      setMessage("");
    }
  };

  return (
    <div className="login-big-cont">
      <div className="login-container">
        {showForgotPasswrodForm ? (
          <>
            <h4>{translations.loginAccess7} password</h4>
            <div className="reset-pass-rel">
              <form onSubmit={handleForgotPassword} noValidate>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {message && <p>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="mt-2 d-flex justify-content-center">
                  <button type="submit" className="login-btn">
                    {translations.loginAccess7}
                  </button>
                  {loading && (
                    <div className="spinner-rel">
                      <div className="spinner-abs">
                        <Spinner animation="border" size="sm" />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
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
                  onKeyDown={(e) => handleEnterClick(e)}
                  value={formData.password}
                  required
                />
                <div className="btn-show-pass-login">
                  <button className="btn-none" onClick={clickToShowPass}>
                    <img src={showPassword ? "/icons/eye.svg" : "/icons/eye-slash.svg"} alt="" />
                  </button>
                </div>
              </div>
              {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
              <div className="remember-me">
                <input type="checkbox" id="remember-me" name="remember-me" />
                <label htmlFor="remember-me">{translations.loginAccess}</label>
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="login-btn">
                  {translations.loginAccess3}
                </button>
                {loading && (
                  <div className="spinner-rel">
                    <div className="spinner-abs">
                      <Spinner animation="border" size="sm" />
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="register">
              <div className="reset-question">
                <button type="button" onClick={() => setShowForgotPasswordForm(true)}>
                  {translations.loginAccess2}
                </button>
              </div>
              <span className="not-register">{translations.loginAccess4}</span>
              <button onClick={onShowRegister} className="register-btn">
                {translations.loginAccess5}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
