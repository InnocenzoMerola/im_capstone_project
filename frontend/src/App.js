import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN } from "./redux/actions";
import Home from "./pages/Home";
import Guest from "./pages/profile/Guest";
import Login from "./pages/profile/Login";
import Register from "./pages/profile/Register";
import CreateStop from "./pages/stops/CreateStop";
import ShowStops from "./pages/stops/ShowStops";
import StopDetail from "./pages/stops/StopDetail";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import CategoryShow from "./pages/CategoryShow";
import EditStop from "./pages/stops/EditStop";
import Profile from "./pages/profile/Profile";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = "http://localhost:8000";

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    axios("/api/user")
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
      })
      .catch((error) => console.log("Errore: ", error))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  // const handleShowRegisterForm = () => {
  //   setShowRegisterForm(true);
  // };

  // const handleCloseRegisterForm = () => {
  //   setShowRegisterForm(false);
  // };

  return (
    loaded && (
      <BrowserRouter>
        <MyNav />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />

            <Route element={<Guest />}>
              {/* <Route path="/login" element={<Login />} /> */}

              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              {/* Stops */}
              <Route path="/create-stops" element={<CreateStop />} />
              <Route path="/stops/:id" element={<StopDetail />} />
              <Route path="/stops/:id/edit" element={<EditStop />} />

              {/* Profile */}
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/category/:id" element={<CategoryShow />} />
            <Route path="/stops" element={<ShowStops />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  );
}
export default App;
