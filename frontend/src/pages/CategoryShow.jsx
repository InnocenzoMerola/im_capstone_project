import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryShow = function () {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/categories/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/404");
        }
      })
      .then((data) => setCategory(data.data))
      .catch((error) => console.error(error));
    console.log("Ewhjhe");
  }, [id]);

  return category ? (
    <div>
      <h1>{category.name}</h1>
      <ul>
        {category.stops.map((stop) => (
          <li key={stop.id}>{stop.name}</li>
        ))}
      </ul>
    </div>
  ) : (
    // <p>loading....</p>
    <div></div>
  );
};

export default CategoryShow;
