import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CreateStop = function () {
  const [img, setImg] = useState(null);
  // const { stopId } = useParams();
  // const { categoryId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
    phone: "",
    url: "",
    description_it: "",
    description_en: "",
    description_fr: "",
    description_na: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

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

  const updateImageField = (e) => {
    updateInputValue(e);
    setImg(e.target.files[0]);
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
        body.append("image", formData.image);
        body.append("phone", formData.phone);
        body.append("url", formData.url);
        body.append("description_it", formData.description_it);
        body.append("description_en", formData.description_en);
        body.append("description_fr", formData.description_fr);
        body.append("description_na", formData.description_na);
        body.append("category_id", formData.category_id);

        return axios.post("/api/v1/stops", body);
      })
      .then((response) => {
        console.log("Creato con successo");

        assignCategoryToStop(response.data.id, formData.category_id);
        axios.get("/api/v1/stops");
      })
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

  return (
    <div className="">
      <div className="">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => updateInputValue(e)}
              value={formData.name}
              required
            />
          </div>
          <div className="input-field">
            <label>Luogo</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              onChange={(e) => updateInputValue(e)}
              value={formData.location}
              required
            />
          </div>
          <div className="input-field">
            <label>Telefono / Cellulare</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={(e) => updateInputValue(e)}
              value={formData.phone}
            />
          </div>
          <div className="input-field">
            <label>Indirizzo URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              name="url"
              onChange={(e) => updateInputValue(e)}
              value={formData.url}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Immagine
            </label>
            <input type="file" className="form-control" id="image" name="image" onChange={(e) => updateImageField(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categoria
            </label>
            <select
              className="form-select"
              id="category"
              name="category_id"
              onChange={(e) => updateCategoryValue(e)}
              value={formData.category_id}
            >
              <option value="">Seleziona una categoria</option>
              {categories.map((category) => (
                <>
                  {category.children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </>
              ))}
            </select>
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

export default CreateStop;
