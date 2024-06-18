import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "../../comments/ShowComment";
import AddComment from "../../comments/AddComment";

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
          <h1>{stopData.name}</h1>
          <h2>{stopData.location}</h2>
          <h3>{stopData.categories[0].name}</h3>
          <p>{stopData.description_it}</p>
          <img src={`/storage/${stopData.image}`} alt={stopData.name} />
          <img src={`/storage/${stopData.image2}`} alt={stopData.name} />
          <img src={`/storage/${stopData.image3}`} alt={stopData.name} />
          <img src={`/storage/${stopData.image4}`} alt={stopData.name} />

          <ShowComment stopId={stopData.id} />
          <AddComment stopId={stopData.id} />
        </>
      )}
    </div>
  );
};

export default StopDetail;
