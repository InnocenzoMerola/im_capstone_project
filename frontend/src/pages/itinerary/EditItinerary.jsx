import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditItinerary = function () {
  const { id } = useParams();
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
            name_na: data.name_na || "",
            description_it: data.description_it || "",
            description_en: data.description_en || "",
            description_fr: data.description_fr || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name_it", formData.name_it);
    body.append("name_en", formData.name_en);
    body.append("name_fr", formData.name_fr);
    body.append("name_na", formData.name_na);
    body.append("description_it", formData.description_it);
    body.append("description_en", formData.description_en);
    body.append("description_fr", formData.description_fr);
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
      })
      .catch((error) => console.log("Errore durante la modifica ", error));
  };

  return (
    <div className="">
      <div className="">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              id="name_it"
              name="name_it"
              onChange={(e) => updateInputValue(e)}
              value={formData.name_it}
              required
            />
          </div>
          <div className="input-field">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              id="name_en"
              name="name_en"
              onChange={(e) => updateInputValue(e)}
              value={formData.name_en}
            />
          </div>
          <div className="input-field">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              id="name_fr"
              name="name_fr"
              onChange={(e) => updateInputValue(e)}
              value={formData.name_fr}
            />
          </div>
          <div className="input-field">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              id="name_na"
              name="name_na"
              onChange={(e) => updateInputValue(e)}
              value={formData.name_na}
            />
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Descrizione ITA"
              id="description_it"
              name="description_it"
              onChange={(e) => updateInputValue(e)}
              value={formData.description_it}
            ></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Descrizione ENG"
              id="description_en"
              name="description_en"
              onChange={(e) => updateInputValue(e)}
              value={formData.description_en}
            ></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Descrizione FRA"
              id="description_fr"
              name="description_fr"
              onChange={(e) => updateInputValue(e)}
              value={formData.description_fr}
            ></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Descrizione NAP"
              id="description_na"
              name="description_na"
              onChange={(e) => updateInputValue(e)}
              value={formData.description_na}
            ></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="login-btn">
              CREA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItinerary;
