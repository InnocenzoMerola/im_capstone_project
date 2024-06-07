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
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

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

  return (
    loaded && (
      <BrowserRouter>
        <MyNav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />

            <Route element={<Guest />}>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  );
}
export default App;
