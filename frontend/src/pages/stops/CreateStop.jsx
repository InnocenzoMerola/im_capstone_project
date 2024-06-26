import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../traductions/LanguageContext";
import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";

const CreateStop = function () {
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    phone: "",
    url: "",
    description_it: "",
    description_en: "",
    description_fr: "",
    description_sp: "",
    description_na: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("Errore durante il recupero delle categorie", error));
  }, []);

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateImageField = (e, imgNumber) => {
    const file = e.target.files[0];

    switch (imgNumber) {
      case 1:
        setImg(file);
        break;
      case 2:
        setImg2(file);
        break;
      case 3:
        setImg3(file);
        break;
      case 4:
        setImg4(file);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form inviato");

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("location", formData.location);
        if (img) {
          body.append("image", img);
        }
        if (img2) {
          body.append("image2", img2);
        }

        if (img3) {
          body.append("image3", img3);
        }
        if (img4) {
          body.append("image4", img4);
        }
        // body.append("image", formData.image);
        body.append("phone", formData.phone);
        body.append("url", formData.url);
        body.append("description_it", formData.description_it);
        body.append("description_en", formData.description_en);
        body.append("description_fr", formData.description_fr);
        body.append("description_sp", formData.description_sp);
        body.append("description_na", formData.description_na);
        body.append("category_id", formData.category_id);

        return axios.post("/api/v1/stops", body);
      })
      .then((response) => {
        console.log("Creato con successo");

        assignCategoryToStop(response.data.id, formData.category_id);
        return response.data.id;
        // axios.get("/api/v1/stops");
      })
      .then((newId) => navigate(`/stops/${newId}`))
      .catch((error) => console.log("Errore durante la creazione: ", error));
  };

  const assignCategoryToStop = (stopId, categoryId) => {
    axios
      .post(`/api/v1/stops/${stopId}/assign-category`, { category_id: categoryId })
      .then((response) => {
        console.log("Categoria assegnata correttamente");
      })
      .catch((error) => console.log("Errore durante l'assegnazione della categoria", error));
  };

  const updateCategoryValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      category_id: e.target.value,
    }));
  };

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="container create-edit-cont">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">{translations.createStop}</h3>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                  <label htmlFor="name" className="form-label">
                    {translations.name}
                  </label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name"
                    name="name"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="location" className="form-label">
                    {translations.location}
                  </label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="location"
                    name="location"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.location}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="phone" className="form-label">
                    {translations.phone}
                  </label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="phone"
                    name="phone"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.phone}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="url" className="form-label">
                    {translations.url}
                  </label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="url"
                    name="url"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.url}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    {translations.image}
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    id="image"
                    name="image"
                    onChange={(e) => updateImageField(e, 1)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image2" className="form-label">
                    {translations.image}
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    id="image2"
                    name="image2"
                    onChange={(e) => updateImageField(e, 2)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image3" className="form-label">
                    {translations.image}
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    id="image3"
                    name="image3"
                    onChange={(e) => updateImageField(e, 3)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image4" className="form-label">
                    {translations.image}
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    id="image4"
                    name="image4"
                    onChange={(e) => updateImageField(e, 4)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    {translations.category}
                  </label>
                  <select
                    className="form-select stops-input"
                    id="category"
                    name="category_id"
                    onChange={(e) => updateCategoryValue(e)}
                    value={formData.category_id}
                    required
                  >
                    <option value="">{translations.selectCategory}</option>
                    {categories.map((category) =>
                      category.children.map((child) => (
                        <option key={child.id} value={child.id}>
                          {language === "it" && <>{child.name_it}</>}
                          {language === "en" && <>{child.name_en}</>}
                          {language === "fr" && <>{child.name_fr}</>}
                          {language === "sp" && <>{child.name_sp}</>}
                        </option>
                      ))
                    )}
                  </select>
                </div>

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
                    <option value="FRA">{translations.languageFr} </option>
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
                        required
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
                        required
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
                        required
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
                        required
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
                    {translations.create}
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

export default CreateStop;
