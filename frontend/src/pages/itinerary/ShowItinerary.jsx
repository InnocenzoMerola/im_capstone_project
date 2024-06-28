import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../traductions/LanguageContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";

const ShowItinerary = function () {
  const [itinerary, setItinerary] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const user = useSelector((state) => state.user);

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];
  useEffect(() => {
    axios
      .get(`/api/v1/itineraries/${id}`)
      .then((response) => {
        setItinerary(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/404");
      });
  }, [id]);

  const handleDelete = (id) => {
    console.log("ID da eliminare", id);
    axios
      .delete(`/api/v1/itineraries/${id}`)
      .then((response) => {
        console.log("Itinerario eliminato con successo");
        // navigate(`/categories/${id}`);
        setItinerary((prevItinerary) => ({
          ...prevItinerary,
          itineraries: prevItinerary.itineraries.filter((itinerary) => itinerary.id !== id),
        }));
        navigate("/");
      })
      .catch((error) => console.log("Errore durante l'eliminazione dell'itinerario", error));
  };

  const formatBold = (text) => {
    const parts = text.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      } else {
        return part;
      }
    });
  };

  const formatText = (text) => {
    return formatBold(text);
  };

  if (!itinerary) {
    return (
      <div className="spinner">
        <div>
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  const splitParagraphs = (text) => {
    if (text) {
      return text.split("\\n\r\n").map((paragraph, index) => <p key={index}>{formatText(paragraph)}</p>);
    }
  };

  const renderParagraph = () => {
    switch (language) {
      case "it":
        return splitParagraphs(itinerary.description_it);
      case "en":
        return splitParagraphs(itinerary.description_en);
      case "fr":
        return splitParagraphs(itinerary.description_fr);
      case "sp":
        return splitParagraphs(itinerary.description_sp);
      default:
        return <p>Descizione non disponibile</p>;
    }
  };

  return itinerary ? (
    <div className="div-category-stop">
      <div className="container">
        <div className="row row-gap-4">
          <div className="category-title">
            {language === "it" && <h1>{itinerary.name_it}</h1>}
            {language === "en" && <h1>{itinerary.name_en}</h1>}
            {language === "fr" && <h1>{itinerary.name_fr}</h1>}
            {language === "sp" && <h1>{itinerary.name_sp}</h1>}
          </div>
          {user && user.role === "admin" && (
            <div className="d-flex col-12 col-lg-9 col-xl-7 justify-content-end gap-2">
              <div className="edit-link">
                <Link to={`/itineraries/${id}/edit`}>{translations.edit}</Link>
              </div>
              <button onClick={() => handleDelete(itinerary.id)} className="btn btn-danger">
                Elimina
              </button>
            </div>
          )}
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="stop-description">{renderParagraph()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ShowItinerary;
