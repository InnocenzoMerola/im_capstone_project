import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../traductions/LanguageContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const CategoryShow = function () {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // const apiUrl = process.env.APP_URL || "http://localhost:8000";

    axios
      .get(`/api/v1/categories/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Errore nella chiamata", error);
        navigate("/404");
      });
  }, [id]);

  const handleDelete = (stopId) => {
    console.log("ID da eliminare", stopId);
    axios
      .delete(`/api/v1/stops/${stopId}`)
      .then((response) => {
        console.log("Fermata eliminata con successo");
        // navigate(`/categories/${id}`);
        setCategory((prevCategory) => ({
          ...prevCategory,
          stops: prevCategory.stops.filter((stop) => stop.id !== stopId),
        }));
      })
      .catch((error) => console.log("Errore durante l'eliminazione della fermata", error));
  };

  if (!category) {
    return (
      <div className="spinner">
        <div>
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  return category ? (
    <div className="div-category-stop">
      <div className="container">
        <div className="row row-gap-4">
          <div className="category-title">
            {language === "it" && <h1>{category.name_it}</h1>}
            {language === "en" && <h1>{category.name_en}</h1>}
            {language === "fr" && <h1>{category.name_fr}</h1>}
            {language === "sp" && <h1>{category.name_sp}</h1>}
          </div>
          {category.data.stops.map((stop) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={stop.id}>
              <div className={`card ${user && user.role === "admin" ? "stops-card-admin" : "stops-card"}`}>
                <Link to={user ? `/stops/${stop.id}` : "#"}>
                  <img src={`/storage/${stop.image}`} className="card-img-top" alt="" />
                  <div className="card-body card-text-color">
                    <h5>{stop.name}</h5>
                    {language === "it" && <p className="card-text truncate-text">{stop.description_it}</p>}
                    {language === "en" && <p className="card-text truncate-text">{stop.description_en}</p>}
                    {language === "fr" && <p className="card-text truncate-text">{stop.description_fr}</p>}
                    {language === "sp" && <p className="card-text truncate-text">{stop.description_sp}</p>}
                  </div>
                </Link>
                {user && user.role === "admin" && (
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-edit">
                      <Link to={`/stops/${stop.id}/edit`} className="btn btn-edit">
                        Edit
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(stop.id)} className="btn btn-danger">
                      Elimina
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    // <p>loading....</p>
    <div></div>
  );
};

export default CategoryShow;
