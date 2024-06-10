import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowStops = function () {
  const [stops, setStops] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/stops`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => setStops(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {stops.map((stop) => (
        <>
          <h1>{stop.name}</h1>
          <h2>{stop.location}</h2>
        </>
      ))}
    </div>
  );
};

export default ShowStops;
