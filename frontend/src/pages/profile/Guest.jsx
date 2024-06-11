import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Guest = function () {
  const user = useSelector((state) => state.user);

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default Guest;
