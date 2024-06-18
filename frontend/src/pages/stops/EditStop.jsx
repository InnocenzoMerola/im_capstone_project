import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditStop = function () {
  const { id } = useParams();
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const navigate = useNavigate();

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
    description_na: "",
    categories: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

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
          ...formData,
          name: data.name || "",
          location: data.location || "",
          image: data.image || "",
          image2: data.image2 || "",
          image3: data.image3 || "",
          image4: data.image4 || "",
          phone: data.phone || "",
          url: data.url || "",
          description_it: data.description_it || "",
          description_en: data.description_en || "",
          description_fr: data.description_fr || "",
          description_na: data.description_na || "",
          categories: data.categories[0].id || "",
        });
      })
      .catch((error) => console.log("Errore durante il recupero dei dati", error));
  };

  const fetchCategories = () => {
    axios
      .get("/api/v1/categories")
      .then((response) => {
        console.log("Categorie dall'API", response);
        setCategories(response.data);
      })
      .catch((error) => console.log("Errore durante il recupero delle categorie", error));
  };

  const updateInputValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateImageField = (e, imgNumber) => {
    // setFormData((oldFormData) => ({
    //   ...oldFormData,
    //   image: e.target.files[0],
    // }));
    // setImg(e.target.files[0]);

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
    console.log("Invio Form Modifica");

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
    body.append("phone", formData.phone);
    body.append("url", formData.url);
    body.append("description_it", formData.description_it);
    body.append("description_en", formData.description_en);
    body.append("description_fr", formData.description_fr);
    body.append("description_na", formData.description_na);
    body.append("category_id", formData.categories);
    body.append("_method", "put");

    axios
      .post(`/api/v1/stops/${id}`, body, {
        headers: {
          "Content-Type": "x-www-form-control",
        },
      })
      .then((response) => {
        console.log("Aggiornato con successo");
        // console.log("Body ", body);

        navigate("/stops");
      })
      .catch((error) => console.log("Errore durante la modifica: ", error));
  };

  const updateCategoryValue = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      categories: e.target.value,
    }));
    console.log("FormData", formData);
  };

  const handleChangeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Crea Fermata</h3>
              <form onSubmit={handleSubmit} method="put">
                <input type="hidden" name="id" value={id} />
                <div className="input-field">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    name="name"
                    onChange={updateInputValue}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="location">Luogo</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    name="location"
                    onChange={updateInputValue}
                    value={formData.location}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="phone">Telefono / Cellulare</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    name="phone"
                    onChange={updateInputValue}
                    value={formData.phone}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="url">Indirizzo URL</label>
                  <input
                    type="text"
                    className="form-control stops-input"
                    name="url"
                    onChange={updateInputValue}
                    value={formData.url}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Immagine
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    name="image"
                    onChange={(e) => updateImageField(e, 1)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image2" className="form-label">
                    Immagine
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    name="image2"
                    onChange={(e) => updateImageField(e, 2)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image3" className="form-label">
                    Immagine
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    name="image3"
                    onChange={(e) => updateImageField(e, 3)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image4" className="form-label">
                    Immagine
                  </label>
                  <input
                    type="file"
                    className="form-control stops-input"
                    name="image4"
                    onChange={(e) => updateImageField(e, 4)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoria
                  </label>
                  <select
                    className="form-select  stops-input"
                    onChange={updateCategoryValue}
                    value={formData.categories}
                  >
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
                        onChange={updateInputValue}
                        value={formData.description_it}
                        name="description_it"
                      ></textarea>
                      <label for="floatingTextarea">Descrizione ITA</label>
                    </div>
                  )}

                  {selectedLanguage === "ENG" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione ENG"
                        onChange={updateInputValue}
                        value={formData.description_en}
                        name="description_en"
                      ></textarea>
                      <label for="floatingTextarea">Descrizione ENG</label>
                    </div>
                  )}

                  {selectedLanguage === "FRA" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control textarea-descript"
                        placeholder="Descrizione FRA"
                        onChange={updateInputValue}
                        value={formData.description_fr}
                        name="description_fr"
                      ></textarea>
                      <label for="floatingTextarea">Descrizione FRA</label>
                    </div>
                  )}

                  {selectedLanguage === "NAP" && (
                    <div className="form-floating">
                      <textarea
                        className="form-control  textarea-descript"
                        placeholder="Descrizione NAP"
                        onChange={updateInputValue}
                        value={formData.description_na}
                        name="description_na"
                      ></textarea>
                      <label for="floatingTextarea">Descrizione NAP</label>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="create-edit-btn">
                    MODIFICA
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

export default EditStop;
