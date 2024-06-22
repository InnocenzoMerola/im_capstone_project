import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "../../comments/ShowComment";
import AddComment from "../../comments/AddComment";
import { Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { useLanguage } from "../../traductions/LanguageContext";
import { useSelector } from "react-redux";

const StopDetail = function () {
  const [stopData, setStopData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { language } = useLanguage();
  const user = useSelector((state) => state.user);

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

  const splitParagraphs = (text) => {
    if (text) {
      return text.split("\\n").map((paragraph, index) => <p key={index}>{paragraph}</p>);
    }
  };

  if (!stopData) {
    return <Spinner animation="grow" />;
  }

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
              <div className="col-7">
                <div className="stop-title">
                  <h1>{stopData.data.name}</h1>
                </div>
                <div>
                  <img src={`/storage/${stopData.data.image}`} alt={stopData.data.name} />
                </div>
                <div className="stop-category">
                  {language === "it" && <Badge className="category-badge">{stopData.data.categories[0].name_it}</Badge>}
                  {language === "en" && <Badge className="category-badge">{stopData.data.categories[0].name_en}</Badge>}
                  {language === "fr" && <Badge className="category-badge">{stopData.data.categories[0].name_fr}</Badge>}
                  {language === "sp" && <Badge className="category-badge">{stopData.data.categories[0].name_sp}</Badge>}
                </div>
                <div className="stop-location">
                  <h6>Località: {stopData.data.location}</h6>
                </div>
                <div className="stop-description">{renderParagraph()}</div>
                <div className="stop-image">
                  <img src={`/storage/${stopData.data.image2}`} alt={stopData.data.name} />
                </div>
                <div className="stop-image">
                  <img src={`/storage/${stopData.data.image3}`} alt={stopData.data.name} />
                </div>
              </div>
              <div className="col-3 offset-1">
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
