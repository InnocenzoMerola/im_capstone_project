import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShowComment from "../../comments/ShowComment";
import AddComment from "../../comments/AddComment";
import { Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { useLanguage } from "../../traductions/LanguageContext";
import { useSelector } from "react-redux";

import translationsIt from "../../traductions/translate-page/translation-it";
import translationsEn from "../../traductions/translate-page/translation-en";
import translationsFr from "../../traductions/translate-page/translation-fr";
import translationsSp from "../../traductions/translate-page/translation-sp";

const StopDetail = function () {
  const [stopData, setStopData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { language } = useLanguage();
  const user = useSelector((state) => state.user);

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  useEffect(() => {
    console.log("ID", id);
    if (id) {
      axios
        .get(`/api/v1/stops/${id}`)
        .then((response) => {
          setStopData(response.data);
          fetchComments(id);
        })
        .catch((error) => console.log("Errore ", error));
    }
  }, [id]);
  const fetchComments = (stopId) => {
    axios
      .get(`/api/v1/stops/${stopId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log("Errore nella chiamata API", error));
  };

  // const splitParagraphs = (text) => {
  //   if (text) {
  //     return text.split("\\n").map((paragraph, index) => <p key={index}>{paragraph}</p>);
  //   }
  // };

  if (!stopData) {
    return (
      <div className="spinner">
        <div>
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

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

  const splitParagraphs = (text) => {
    if (text) {
      if (text.includes("\\n\r\n")) {
        return text.split("\\n\r\n").map((paragraph, index) => <p key={index}>{formatText(paragraph)}</p>);
      } else if (text.includes("\\n")) {
        return text.split("\\n").map((paragraph, index) => <p key={index}>{paragraph}</p>);
      } else {
        return text;
      }
    }
  };

  const renderParagraph = () => {
    switch (language) {
      case "it":
        return splitParagraphs(stopData.data.description_it);
      case "en":
        return splitParagraphs(stopData.data.description_en);
      case "fr":
        return splitParagraphs(stopData.data.description_fr);
      case "sp":
        return splitParagraphs(stopData.data.description_sp);
      default:
        return <p>Descizione non disponibile</p>;
    }
  };

  // const paragraphs = {
  //   it: stopData.data.description_it.split("\n\n").filter((p) => p !== ""),
  //   en: stopData.data.description_en.split("\n\n").filter((p) => p !== ""),
  //   fr: stopData.data.description_fr.split("\n\n").filter((p) => p !== ""),
  //   sp: stopData.data.description_sp.split("\n\n").filter((p) => p !== ""),
  // };

  if (!id) {
    return <div>Id non valido</div>;
  }

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      {stopData && (
        <>
          <div className="container stop-detail-cont">
            <div className="row">
              <div className="col-12 col-lg-7">
                <div className="stop-title">
                  <h1>{stopData.data.name}</h1>
                </div>
                <div>
                  <img src={`/storage/${stopData.data.image}`} alt={stopData.data.name} />
                </div>

                <div className="d-flex space-between align-items-baseline mt-2">
                  {stopData.data.url && (
                    <div className="stop-globe">
                      <Link to={stopData.data.url} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          fill="currentColor"
                          className="bi bi-globe me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                        </svg>
                        <span>{translations.webSite}</span>
                      </Link>
                    </div>
                  )}
                  <div className="stop-category ms-auto">
                    {language === "it" && (
                      <Badge className="category-badge">{stopData.data.categories[0].name_it}</Badge>
                    )}
                    {language === "en" && (
                      <Badge className="category-badge">{stopData.data.categories[0].name_en}</Badge>
                    )}
                    {language === "fr" && (
                      <Badge className="category-badge">{stopData.data.categories[0].name_fr}</Badge>
                    )}
                    {language === "sp" && (
                      <Badge className="category-badge">{stopData.data.categories[0].name_sp}</Badge>
                    )}
                  </div>
                </div>

                <div className="stop-location">
                  <h6>
                    {translations.locationStop}: {stopData.data.location}
                  </h6>
                  {stopData.data.phone && <h6>Tel: {stopData.data.phone}</h6>}
                </div>

                <div className="stop-description">{renderParagraph()}</div>

                {stopData.data.image2 && (
                  <div className="stop-image">
                    <img src={`/storage/${stopData.data.image2}`} alt={stopData.data.name} />
                  </div>
                )}
                {stopData.data.image3 && (
                  <div className="stop-image">
                    <img src={`/storage/${stopData.data.image3}`} alt={stopData.data.name} />
                  </div>
                )}
                {stopData.data.image4 && (
                  <div className="stop-image">
                    <img src={`/storage/${stopData.data.image4}`} alt={stopData.data.name} />
                  </div>
                )}
              </div>
              <div className="col-12 col-sm-10 offset-sm-1 col-lg-3 offset-lg-1">
                <ShowComment comments={comments} />
              </div>
            </div>
          </div>
          {user && <AddComment stopId={stopData.data.id} onAddComment={handleAddComment} />}
        </>
      )}
    </div>
  );
};

export default StopDetail;
