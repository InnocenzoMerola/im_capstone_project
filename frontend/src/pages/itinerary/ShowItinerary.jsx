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
    fetch(`/api/v1/itineraries/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => setItinerary(data.data))
      .catch((error) => console.error(error));
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
        // Odd parts (between ** **) should be in bold
        return <strong key={index}>{part}</strong>;
      } else {
        // Even parts (outside ** **) should remain as is
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
      {user && user.role === "admin" && (
        <div className="d-flex edit-btn gap-2">
          <div className="edit-link">
            <Link to={`/itineraries/${id}/edit`}>{translations.edit}</Link>
          </div>
          <button onClick={() => handleDelete(itinerary.id)} className="btn btn-danger">
            Elimina
          </button>
        </div>
      )}
      <div className="container">
        <div className="row row-gap-4">
          <div className="category-title">
            {language === "it" && <h1>{itinerary.name_it}</h1>}
            {language === "en" && <h1>{itinerary.name_en}</h1>}
            {language === "fr" && <h1>{itinerary.name_fr}</h1>}
            {language === "sp" && <h1>{itinerary.name_sp}</h1>}
          </div>
          <div className="row">
            <div className="col-7">
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
