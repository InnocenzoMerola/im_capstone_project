import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../traductions/LanguageContext";
import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";

const EditItinerary = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  const [formData, setFormData] = useState({
    name_it: "",
    name_en: "",
    name_fr: "",
    name_sp: "",
    name_na: "",
    description_it: "",
    description_en: "",
    description_fr: "",
    description_sp: "",
    description_na: "",
  });

  useEffect(() => {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get(`/api/v1/itineraries/${id}/edit`)
        .then((response) => {
          const data = response.data.itineraries;
          setFormData({
            name_it: data.name_it || "",
            name_en: data.name_en || "",
            name_fr: data.name_fr || "",
            name_sp: data.name_sp || "",
            name_na: data.name_na || "",
            description_it: data.description_it || "",
            description_en: data.description_en || "",
            description_fr: data.description_fr || "",
            description_sp: data.description_sp || "",
            description_na: data.description_na || "",
          });
        })
        .catch((error) => console.log("Errore nel recupero dei dati ", error));
    });
  }, []);

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name_it", formData.name_it);
    body.append("name_en", formData.name_en);
    body.append("name_fr", formData.name_fr);
    body.append("name_sp", formData.name_sp);
    body.append("name_na", formData.name_na);
    body.append("description_it", formData.description_it);
    body.append("description_en", formData.description_en);
    body.append("description_fr", formData.description_fr);
    body.append("description_sp", formData.description_sp);
    body.append("description_na", formData.description_na);
    body.append("_method", "put");

    axios
      .post(`/api/v1/itineraries/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Itinerario aggiornato con successo");
        navigate(`/itineraries/${id}`);
      })
      .catch((error) => console.log("Errore durante la modifica ", error));
  };

  return (
    <div className="container  create-edit-cont">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">{translations.editItinerary}</h3>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                  <label htmlFor="name_it">{translations.name} ITA</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_it"
                    name="name_it"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_it}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="name_en">{translations.name} ENG</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_en"
                    name="name_en"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_en}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="name_fr">{translations.name} FRA</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_fr"
                    name="name_fr"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_fr}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="name_sp">{translations.name} SPA</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_sp"
                    name="name_sp"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_sp}
                  />
                </div>
                {/* <div className="input-field">
                  <label htmlFor="name_na">Nome NAP</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_na"
                    name="name_na"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_na}
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    {translations.language}
                  </label>
                  <select
                    className="form-select  stops-input mb-3"
                    value={selectedLanguage}
                    onChange={(e) => handleChangeLanguage(e.target.value)}
                    id="language"
                  >
                    <option value="">{translations.selectLanguage}</option>
                    <option value="ITA">{translations.languageIt}</option>
                    <option value="ENG">{translations.languageEn}</option>
                    <option value="FRA">{translations.languageFr}</option>
                    <option value="SPA">{translations.languageSp}</option>
                    {/* <option value="NAP">Napoletano </option> */}
                  </select>

                  {selectedLanguage === "" && <div className="separator-form"></div>}

                  {selectedLanguage === "ITA" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione ITA"
                        id="description_it"
                        name="description_it"
                        onChange={(e) => updateInputValue(e)}
                        value={formData.description_it}
                      ></textarea>
                      <label htmlFor="floatingTextarea">{translations.description} ITA</label>
                    </div>
                  )}

                  {selectedLanguage === "ENG" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione ENG"
                        id="description_en"
                        name="description_en"
                        onChange={(e) => updateInputValue(e)}
                        value={formData.description_en}
                      ></textarea>
                      <label htmlFor="floatingTextarea">{translations.description} ENG</label>
                    </div>
                  )}

                  {selectedLanguage === "FRA" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione FRA"
                        id="description_fr"
                        name="description_fr"
                        onChange={(e) => updateInputValue(e)}
                        value={formData.description_fr}
                      ></textarea>
                      <label htmlFor="floatingTextarea">{translations.description} FRA</label>
                    </div>
                  )}

                  {selectedLanguage === "SPA" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione SPA"
                        id="description_sp"
                        name="description_sp"
                        onChange={(e) => updateInputValue(e)}
                        value={formData.description_sp}
                      ></textarea>
                      <label htmlFor="floatingTextarea">{translations.description} SPA</label>
                    </div>
                  )}

                  {/* {selectedLanguage === "NAP" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione NAP"
                        id="description_na"
                        name="description_na"
                        onChange={(e) => updateInputValue(e)}
                        value={formData.description_na}
                      ></textarea>
                      <label htmlFor="floatingTextarea">Descrizione NAP</label>
                    </div>
                  )} */}
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="create-edit-btn">
                    {translations.edit}
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

export default EditItinerary;
