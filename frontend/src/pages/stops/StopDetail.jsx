import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StopDetail = function () {
  const [stop, setStop] = useState(null);
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
      .then((data) => setStop(data.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {stop && (
        <>
          <h1>{stop.name}</h1>
          <h2>{stop.location}</h2>
          <h3>{stop.categories[0].name}</h3>
          <p>{stop.description_it}</p>
          <img src={`/storage/${stop.image}`} alt={stop.name} />
          <img src={`/storage/${stop.image2}`} alt={stop.name} />
          <img src={`/storage/${stop.image3}`} alt={stop.name} />
          <img src={`/storage/${stop.image4}`} alt={stop.name} />
        </>
      )}
    </div>
  );
};

export default StopDetail;
