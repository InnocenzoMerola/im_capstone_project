import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateItinerary = function () {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_it: "",
    name_en: "",
    name_fr: "",
    name_na: "",
    description_it: "",
    description_en: "",
    description_fr: "",
    description_na: "",
  });

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name_it", formData.name_it);
        body.append("name_en", formData.name_en);
        body.append("name_fr", formData.name_fr);
        body.append("name_na", formData.name_na);
        body.append("description_it", formData.description_it);
        body.append("description_en", formData.description_en);
        body.append("description_fr", formData.description_fr);
        body.append("description_na", formData.description_na);
        return axios.post("/api/v1/itineraries", body);
      })
      .then(() => {
        axios.get("/api/v1/itineraries");
        navigate("/itineraries");
      })
      .catch((error) => console.log("Errore nella chiamata API", error));
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Crea itinerario</h3>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                  <label htmlFor="name_it">Nome ITA</label>
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
                  <label htmlFor="name_en">Nome ENG</label>
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
                  <label htmlFor="name_fr">Nome FRA</label>
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
                  <label htmlFor="name_na">Nome NAP</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    id="name_na"
                    name="name_na"
                    onChange={(e) => updateInputValue(e)}
                    value={formData.name_na}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    Lingue
                  </label>
                  <select
                    className="form-select  stops-input mb-3"
                    value={selectedLanguage}
                    onChange={(e) => handleChangeLanguage(e.target.value)}
                    id="language"
                  >
                    <option value="">Seleziona una lingua</option>
                    <option value="ITA">Italiano</option>
                    <option value="ENG">Inglese</option>
                    <option value="FRA">Francese </option>
                    <option value="NAP">Napoletano </option>
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
                      <label htmlFor="floatingTextarea">Descrizione ITA</label>
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
                      <label htmlFor="floatingTextarea">Descrizione ENG</label>
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
                      <label htmlFor="floatingTextarea">Descrizione FRA</label>
                    </div>
                  )}

                  {selectedLanguage === "NAP" && (
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
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="create-edit-btn">
                    CREA
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

export default CreateItinerary;
