import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";

const ContactForm = () => {
  const { language } = useLanguage();

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

    axios
      .post("/api/v1/contact", formData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Email non inviata, operazione FALLITA");
      });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
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
                <div className="d-flex justify-content-end">
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
  );
};

export default ContactForm;
