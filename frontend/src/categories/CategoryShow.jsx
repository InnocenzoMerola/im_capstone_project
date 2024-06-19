import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  }, [id]);

  return category ? (
    <div className="div-category-stop">
      <div className="container">
        <div className="row row-gap-4">
          <div className="category-title">
            <h1>{category.name}</h1>
          </div>
          {category.stops.map((stop) => (
            <div className="col-3" key={stop.id}>
              <Link to={`/stops/${stop.id}`}>
                <div className="card">
                  <img src={`/storage/${stop.image}`} className="card-img-top" alt={stop.name} />
                  <div className="card-body">
                    <h5 className="card-title">{stop.name}</h5>
                    <p className="card-text">{stop.description_it}</p>
                    {/* <a href="#" className="btn btn-primary">
            Go somewhere
            </a> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    // <p>loading....</p>
    <div></div>
  );
};

export default CategoryShow;
