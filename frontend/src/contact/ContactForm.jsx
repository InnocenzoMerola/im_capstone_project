import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ContactForm = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/v1/contact", formData)
      .then((response) => {
        setLoading(false);
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Email non inviata, operazione FALLITA");
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner-reg">
          <div className="text-center">
            <h2 className="mb-3">Invio in corso...</h2>
            <Spinner animation="grow" />
          </div>
        </div>
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
              <div className="card stops-form">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">{translations.contactUs}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-field">
                      <label htmlFor="name">{translations.name}</label>
                      <input
                        type="text"
                        className="form-control contact-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control contact-input "
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="message">{translations.message}</label>
                      <textarea
                        name="message"
                        className="form-control contact-input textarea"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center justify-content-lg-end">
                      <button type="submit" className="contact-btn">
                        Invia
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
