import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Categories from "./categories/Categories";
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
import CategoryShow from "./categories/CategoryShow";
import EditStop from "./pages/stops/EditStop";
import Profile from "./pages/profile/Profile";
import MyFooter from "./components/MyFooter";
import CreateGuide from "./pages/guides/CreateGuide";
import CreateItinerary from "./pages/itinerary/CreateItinerary";
import EditItinerary from "./pages/itinerary/EditItinerary";
import NapoliStory from "./pages/NapoliStory";
import Partenope from "./pages/Partenope";
import Vesuvio from "./pages/Vesuvio";
import VoiceOfNaples from "./pages/VoiceOfNaples";
import ContactForm from "./contact/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./traductions/LanguageContext";
import ResetPassword from "./password/ResetPassword";
import ShowItinerary from "./pages/itinerary/ShowItinerary";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = "http://localhost:8000";
  // axios.defaults.baseURL = "https://im-benvenuti-a-napoli.it/";

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

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
  // --------------
  axios.interceptors.request.use((config) => {
    const token = getCookie("XSRF-TOKEN");
    if (token) {
      config.headers["X-XSRF-TOKEN"] = token;
    }
    return config;
  });

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  // -------------------
  return (
    loaded && (
      <>
        <LanguageProvider>
          {location.pathname !== "/register" && <MyNav />}
          <div>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/categories" element={<Categories />} /> */}

              <Route element={<Guest />}>
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="/password-reset/:token" element={<ResetPassword />} />

              <Route path="/story" element={<NapoliStory />} />
              <Route path="/partenope" element={<Partenope />} />
              <Route path="/vesuvio" element={<Vesuvio />} />
              <Route path="/voci-di-napoli" element={<VoiceOfNaples />} />

              <Route element={<ProtectedRoutes />}>
                {/* Stops */}
                <Route path="/create-stops" element={<CreateStop />} />
                <Route path="/stops/:id" element={<StopDetail />} />
                <Route path="/stops/:id/edit" element={<EditStop />} />
                {/* <Route path="/create-guides" element={<CreateGuide />} /> */}
                <Route path="/create-itineraries" element={<CreateItinerary />} />
                <Route path="/itineraries/:id/edit" element={<EditItinerary />} />
                <Route path="/itineraries/:id" element={<ShowItinerary />} />
                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<ContactForm />} />
              </Route>

              <Route path="/categories/:id" element={<CategoryShow />} />
              {/* <Route path="/stops" element={<ShowStops />} /> */}

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
          {location.pathname !== "/register" && <MyFooter />}
          {/* <MyFooter /> */}
        </LanguageProvider>
      </>
    )
  );
}
export default App;
