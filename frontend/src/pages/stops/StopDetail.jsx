import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "../../comments/ShowComment";
import AddComment from "../../comments/AddComment";
import { Badge } from "react-bootstrap";

const StopDetail = function () {
  const [stopData, setStopData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/stops/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => setStopData(data.data))
      .catch((error) => console.error(error));
  }, [id, navigate]);

  return (
    <div>
      {stopData && (
        <>
          <div className="container stop-detail-cont">
            <div className="row">
              <div className="col-6">
                <div>
                  <h1>{stopData.name}</h1>
                </div>
                <div>
                  <img src={`/storage/${stopData.image}`} alt={stopData.name} />
                </div>
                <div>
                  <h2>{stopData.location}</h2>
                </div>
                <div>
                  <Badge>{stopData.categories[0].name}</Badge>
                </div>
                <div>
                  <p>{stopData.description_it}</p>
                </div>

                <div>
                  <img src={`/storage/${stopData.image2}`} alt={stopData.name} />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <img src={`/storage/${stopData.image3}`} alt={stopData.name} />
                </div>
                <div>
                  <img src={`/storage/${stopData.image4}`} alt={stopData.name} />
                </div>
              </div>
            </div>
          </div>
          <ShowComment stopId={stopData.id} />
          <AddComment stopId={stopData.id} />
        </>
      )}
    </div>
  );
};

export default StopDetail;
