import { Link, useParams } from "react-router-dom";

const AdminControl = function () {
  return (
    <div className="container admin-expand">
      <div className="row ">
        <div className="col">
          <Link to="/create-stops">Crea Stop</Link>
        </div>

        <div className="col">
          <Link to="/create-itineraries">Crea Itinerario</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
