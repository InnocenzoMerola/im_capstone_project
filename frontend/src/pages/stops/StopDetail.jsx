import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "../../comments/ShowComment";
import AddComment from "../../comments/AddComment";
import { Badge } from "react-bootstrap";
import axios from "axios";

const StopDetail = function () {
  const [stopData, setStopData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("ID", id);
    if (id) {
      axios
        .get(`/api/v1/stops/${id}`)
        .then((response) => {
          setStopData(response.data);
          fetchComments(response.data.id);
        })
        .catch((error) => console.log("Errore ", error));
    }
  }, [id]);

  if (!id) {
    return <div>Id non valido</div>;
  }

  const fetchComments = (stopId) => {
    axios
      .get(`/api/v1/stops/${stopId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log("Errore nella chiamata API", error));
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      {stopData && (
        <>
          <div className="container stop-detail-cont">
            <div className="row">
              <div className="col-6">
                <div className="stop-title">
                  <h1>{stopData.data.name}</h1>
                </div>
                <div>
                  <img src={`/storage/${stopData.data.image}`} alt={stopData.data.name} />
                </div>
                <div className="stop-location">
                  <h6>Località: {stopData.data.location}</h6>
                </div>
                <div className="stop-category">
                  <Badge>{stopData.data.categories[0].name}</Badge>
                </div>
                <div className="stop-description">
                  <p>{stopData.data.description_it}</p>
                  <p>{stopData.data.description_en}</p>
                  <p>{stopData.data.description_fr}</p>
                  <p>{stopData.data.description_sp}</p>
                </div>

                <div>
                  <img src={`/storage/${stopData.data.image2}`} alt={stopData.data.name} />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <img src={`/storage/${stopData.data.image3}`} alt={stopData.data.name} />
                </div>
                <div>
                  <img src={`/storage/${stopData.data.image4}`} alt={stopData.data.name} />
                </div>
              </div>
            </div>
          </div>
          <ShowComment comments={comments} />
          <AddComment stopId={stopData.data.id} onAddComment={handleAddComment} />
        </>
      )}
    </div>
  );
};

export default StopDetail;
