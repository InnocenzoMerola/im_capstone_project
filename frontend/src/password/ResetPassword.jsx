import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const ResetPassword = function () {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirmation: "",
    message: "",
    error: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  console.log("Email: ", email);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/password-reset", {
        token,
        email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });
      setFormData({
        ...formData,
        message: response.data.message,
        error: "",
      });
      navigate("/");
    } catch (error) {
      setFormData({
        ...formData,
        error: error.response?.data?.errors?.email[0] || "Qualcosa è andato storto, per favore riprova più tardi",
        message: "",
      });
    }
  };

  return (
    <div>
      {token && email && (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card stops-form">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">{translations.loginAccess7} password</h3>

                  <form onSubmit={handleResetPassword}>
                    <div className="input-field">
                      <label>{translations.loginAccess6} password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control contact-input"
                      />
                    </div>
                    <div className="input-field">
                      <label>{translations.loginAccess8} password</label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        required
                        className="form-control contact-input"
                      />
                    </div>
                    <div className="mt-2 d-flex justify-content-end">
                      <button type="submit" className="contact-btn">
                        {translations.loginAccess7} password
                      </button>
                    </div>
                  </form>
                  {formData.message && <p>{formData.message}</p>}
                  {formData.error && <p style={{ color: "red" }}>{formData.error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
