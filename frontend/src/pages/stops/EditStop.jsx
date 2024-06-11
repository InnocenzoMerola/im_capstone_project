import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const EditStop = function () {
  const { id } = useParams();
  const [img, setImg] = useState(null);
  // const { stopId } = useParams();
  // const { categoryId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
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
    console.log("StopId:", id);

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        fetchStopData();
        fetchCategories();
      })
      .catch((error) => console.log("Errore nel reperimento del CSRF Token", error));
  }, [id]);

  const fetchStopData = () => {
    axios
      .get(`/api/v1/stops/${id}/edit`)
      .then((response) => {
        const data = response.data.stop;
        console.log("Dati dall'API", data);
        setFormData({
          name: data.name || "",
          location: data.location || "",
          image: "",
          phone: data.phone || "",
          url: data.url || "",
          description_it: data.description_it || "",
          description_en: data.description_en || "",
          description_fr: data.description_fr || "",
          description_na: data.description_na || "",
          category_id: data.category_id || "",
        });
      })
      .catch((error) => console.log("Errore durante il recupero dei dati", error));
  };

  const fetchCategories = () => {
    axios
      .get("/api/v1/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("Errore durante il recupero delle categorie", error));
  };

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateImageField = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      image: e.target.files[0],
    }));
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invio Form Modifica");

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
    body.append("_method", "put");

    axios
      .post(`/api/v1/stops/${id}`, body, {
        headers: {
          "Content-Type": "x-www-form-control",
        },
      })
      .then((response) => {
        console.log("Aggiornato con successo");
      })
      .catch((error) => console.log("Errore durante la modifica: ", error));
  };

  const updateCategoryValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      category_id: e.target.value,
    }));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} method="put">
        <input type="hidden" name="id" value={id} />
        <div className="input-field">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={updateInputValue}
            value={formData.name}
            required
          />
        </div>
        <div className="input-field">
          <label>Luogo</label>
          <input
            type="text"
            className="form-control"
            name="location"
            onChange={updateInputValue}
            value={formData.location}
            required
          />
        </div>
        <div className="input-field">
          <label>Telefono / Cellulare</label>
          <input type="text" className="form-control" name="phone" onChange={updateInputValue} value={formData.phone} />
        </div>
        <div className="input-field">
          <label>Indirizzo URL</label>
          <input type="text" className="form-control" name="url" onChange={updateInputValue} value={formData.url} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Immagine
          </label>
          <input type="file" className="form-control" name="image" onChange={updateImageField} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoria
          </label>
          <select className="form-select" onChange={updateCategoryValue} value={formData.category_id}>
            <option value="">Seleziona una categoria</option>
            {categories.map((category) =>
              category.children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Descrizione ITA"
            onChange={updateInputValue}
            value={formData.description_it}
            name="description_it"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Descrizione ENG"
            onChange={updateInputValue}
            value={formData.description_en}
            name="description_en"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Descrizione FRA"
            onChange={updateInputValue}
            value={formData.description_fr}
            name="description_fr"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Descrizione NAP"
            onChange={updateInputValue}
            value={formData.description_na}
            name="description_na"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="login-btn">
            MODIFICA
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStop;
