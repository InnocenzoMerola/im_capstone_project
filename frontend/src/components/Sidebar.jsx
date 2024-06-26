import { useEffect, useRef, useState } from "react";
import { LOGOUT } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "../pages/profile/Login";
import AdminControl from "../admin/AdminControl";
import { useLanguage } from "../traductions/LanguageContext";
import translationsIt from "../traductions/translate-page/translation-it";
import translationsEn from "../traductions/translate-page/translation-en";
import translationsFr from "../traductions/translate-page/translation-fr";
import translationsSp from "../traductions/translate-page/translation-sp";
import windowSize from "./WindowSize";

const Sidebar = function () {
  const [categories, setCategories] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const { language, changeLanguage } = useLanguage();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showAdminControl, setShowAdminControl] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const size = windowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [showChild, setShowChild] = useState({
    showNaples: false,
    showItinerary: false,
  });
  const [showCategory, setShowCategory] = useState(null);

  const handleChild = (child) => {
    setShowChild((prevChild) => ({
      ...prevChild,
      ...Object.fromEntries(Object.keys(prevChild).map((key) => [key, key === child ? !prevChild[key] : false])),
      [child]: !prevChild[child],
    }));
    setShowCategory(child === showCategory ? null : child);
  };

  const openSidebar = () => {
    setIsOpen(!isOpen);
    // if (isOpen === true) {
    //   document.body.classList.remove("no-scroll");
    // } else {
    //   document.body.classList.add("no-scroll");
    // }
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterContact = () => {
    setIsContactHovered(true);
  };

  const handleMouseLeaveContact = () => {
    setIsContactHovered(false);
  };

  const loginRef = useRef();

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    navigate("/register");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (showLoginForm && !document.querySelector(".login-container")) {
      //   handleCloseLoginForm();
      // }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        handleCloseLoginForm();
      }
    };

    if (showLoginForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginForm, showAdminControl]);

  const translations = {
    it: translationsIt,
    en: translationsEn,
    fr: translationsFr,
    sp: translationsSp,
  }[language];

  // CATEGORIE

  const languageFlags = {
    it: "/image/bandiera-Italia.png",
    en: "/image/bandiera-Regno-Unito.png",
    fr: "/image/bandiera-Francia.png",
    sp: "/image/bandiera-Spagna.png",
  };

  useEffect(() => {
    axios
      .get(`/api/v1/categories?lang=${language}`)
      .then((response) => {
        // if (!response.ok) navigate("/404");
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Errore nella chiamata api", error);
      });

    axios
      .get(`/api/v1/itineraries?lang=${language}`)
      .then((response) => {
        // if (!response.data) navigate("/404");
        setItineraries(response.data);
      })
      .catch((error) => console.log("Errore nella chiamata API ", error));
  }, [language]);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
    // setLanguage(language === "it" ? "en" : "it");
  };

  return (
    <>
      <button className="btn mobile-nav-btn" type="button" onClick={openSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-list text-white"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""} ${showLoginForm ? "not-overflow" : ""}`}>
        <div className="d-flex justify-content-between align-items-center px-3">
          {user ? (
            <Link to="/profile" onClick={closeSidebar}>
              <img
                src={user.profile_img ? user.profile_img : "/image/profile-image.png"}
                alt=""
                className="nav-user-img rounded-circle"
              />
            </Link>
          ) : (
            <div>
              <Link to="/" className="my-logo" onClick={closeSidebar}>
                I&M
              </Link>
            </div>
          )}

          <button onClick={openSidebar} className="close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-x-lg mb-2"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>

        <ul className="mt-3">
          <li>
            <Link to="https://www.ticketone.it/" target="_blank">
              {translations.buy}
            </Link>
          </li>
          <li>
            <Link to="https://www.comune.napoli.it/home" target="_blank">
              {translations.municipality}
            </Link>
          </li>
          <li>
            <Link
              to="https://www.booking.com/city/it/naples.it.html?aid=1610681;label=naples-5UR2tcza1R05rRY*Ur_MSwS341848315390:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-364177811:lp1008215:li:dec:dm:ppccp=UmFuZG9tSVYkc2RlIyh9YZVcNNsENnH0Cye0voMfmCQ;ws=&gclid=CjwKCAjwp4m0BhBAEiwAsdc4aPwdvzGhKw-bPMlAh6cj1FXD6B1ByYHW-LElzB-uf8z957eabiO0FRoCa6oQAvD_BwE"
              target="_blank"
            >
              Hotel
            </Link>
          </li>
          <li>
            {" "}
            {user ? (
              <Link to="/contact" className="menu-link" onClick={closeSidebar}>
                {translations.footer1}
              </Link>
            ) : (
              <div
                className="div-cont-rel"
                onMouseEnter={handleMouseEnterContact}
                onMouseLeave={handleMouseLeaveContact}
              >
                <div>
                  <Link to="#" className="menu-link">
                    {translations.footer1}
                  </Link>
                </div>
                {isContactHovered && (
                  <div className="div-cont-abs">
                    <p>{translations.contactAccess}</p>
                  </div>
                )}
              </div>
            )}
          </li>
          {!user && (
            <li>
              <>
                <button onClick={handleShowLoginForm} className="btn-none">
                  <p className="m-0 text-white">{translations.login}</p>
                </button>
                <button className="btn-none" onClick={handleShowLoginForm}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock-fill text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                  </svg>
                </button>
                {showLoginForm && (
                  <div ref={loginRef}>
                    <Login
                      onCloseLogin={handleCloseLoginForm}
                      onShowRegister={handleShowRegisterForm}
                      onClick={closeSidebar}
                    />
                  </div>
                )}
              </>
            </li>
          )}

          <li className="d-flex justify-content-evenly">
            <div className="icon-div rounded-circle" onClick={closeSidebar}>
              <Link
                to="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADhGNhsB2qvMNRR-2X6EhyidNy-vzgYGm9M&keywords=Innocenzo%20Merola&origin=ENTITY_SEARCH_HOME_HISTORY&sid=z-b"
                target="_blank"
                className="linke-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin nav"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </Link>
            </div>

            <div className="icon-div rounded-circle" onClick={closeSidebar}>
              <Link to="https://www.instagram.com/enzo__merola/" target="_blank" className="contact-link">
                <svg width="17" height="17" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect>{" "}
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>{" "}
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect>{" "}
                    <path
                      d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                      fill="white"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                      fill="white"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                      fill="white"
                    ></path>{" "}
                    <defs>
                      {" "}
                      <radialGradient
                        id="paint0_radial_87_7153"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                      >
                        {" "}
                        <stop stopColor="#B13589"></stop> <stop offset="0.79309" stopColor="#C62F94"></stop>{" "}
                        <stop offset="1" stopColor="#8A3AC8"></stop>{" "}
                      </radialGradient>{" "}
                      <radialGradient
                        id="paint1_radial_87_7153"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                      >
                        {" "}
                        <stop stopColor="#E0E8B7"></stop> <stop offset="0.444662" stopColor="#FB8A2E"></stop>{" "}
                        <stop offset="0.71474" stopColor="#E2425C"></stop>{" "}
                        <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop>{" "}
                      </radialGradient>{" "}
                      <radialGradient
                        id="paint2_radial_87_7153"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                      >
                        {" "}
                        <stop offset="0.156701" stopColor="#406ADC"></stop>{" "}
                        <stop offset="0.467799" stopColor="#6A45BE"></stop>{" "}
                        <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop>{" "}
                      </radialGradient>{" "}
                    </defs>{" "}
                  </g>
                </svg>
              </Link>
            </div>

            <div
              className="icon-div rounded-circle"
              onClick={user ? closeSidebar : null}
              onMouseEnter={handleMouseEnterContact}
              onMouseLeave={handleMouseLeaveContact}
            >
              <Link to={user ? "/contact" : "#"} className="contact-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Gmail"
                  role="img"
                  viewBox="0 0 512 512"
                  fill="#000000"
                  width="17"
                  height="17"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <rect width="512" height="512" rx="15%" fill="#1a212300"></rect>
                    <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path>
                    <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path>
                    <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path>
                    <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path>
                    <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path>
                  </g>
                </svg>
              </Link>
            </div>

            <div className="icon-div rounded-circle" onClick={closeSidebar}>
              <Link to="" target="_blank" className="contact-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </Link>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button
                className=" language-btn-phone dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={languageFlags[language]} alt={`${language} flag`} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
              <ul className="dropdown-menu language-btn-phone">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleChangeLanguage("it")}
                    disabled={language === "it"}
                  >
                    <img src={languageFlags["it"]} alt="Italian flag" />
                    Italiano
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleChangeLanguage("en")}
                    disabled={language === "en"}
                  >
                    <img src={languageFlags["en"]} alt="English flag" />
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleChangeLanguage("fr")}
                    disabled={language === "fr"}
                  >
                    <img src={languageFlags["fr"]} alt="Franch flag" />
                    French
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleChangeLanguage("sp")}
                    disabled={language === "sp"}
                  >
                    <img src={languageFlags["sp"]} alt="Spanish flag" />
                    Spanish
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li
            className={`phone-parent nav-item phone-big-parent ${showChild.showNaples ? "view" : ""}`}
            onClick={() => handleChild("showNaples")}
          >
            <Link to="#">{translations.showNaples}</Link>
            {showChild.showNaples && (
              <ul className="phone-child nav-phone">
                <li>
                  <Link to="/story" onClick={closeSidebar}>
                    {translations.history}
                  </Link>
                </li>
                <li>
                  <Link to="/partenope" onClick={closeSidebar}>
                    {translations.partenope}
                  </Link>
                </li>
                <li>
                  <Link to="/vesuvio" onClick={closeSidebar}>
                    {translations.vesuvio}
                  </Link>
                </li>
                <li>
                  <Link to="/voci-di-napoli" onClick={closeSidebar}>
                    {translations.voicesOfNaples}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {categories.map((category) => (
            <li
              className={`phone-parent nav-item phone-big-parent ${showChild[category.id] ? "view" : ""}`}
              key={category.id}
              onClick={() => handleChild(category.id)}
            >
              <Link to="#">
                {language === "it" && category.name_it}
                {language === "en" && category.name_en}
                {language === "fr" && category.name_fr}
                {language === "sp" && category.name_sp}
              </Link>

              <ul className="phone-child nav-phone">
                {showChild[category.id] && (
                  <>
                    {category.children.map((childCategory) => (
                      <li key={childCategory.id}>
                        <Link to={`/categories/${childCategory.id}`} onClick={closeSidebar}>
                          {language === "it" && childCategory.name_it}
                          {language === "en" && childCategory.name_en}
                          {language === "fr" && childCategory.name_fr}
                          {language === "sp" && childCategory.name_sp}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </li>
          ))}
          <li
            className={`phone-parent nav-item phone-big-parent ${showChild.showItinerary ? "view" : ""}`}
            onClick={() => handleChild("showItinerary")}
          >
            {user ? (
              <>
                <Link to="#">{translations.itinerary}</Link>
                <ul className="phone-child">
                  {showChild.showItinerary && (
                    <>
                      {itineraries.map((itinerary) => (
                        <li key={itinerary.id}>
                          <Link to={`/itineraries/${itinerary.id}`} onClick={closeSidebar}>
                            {language === "it" && itinerary.name_it}
                            {language === "en" && itinerary.name_en}
                            {language === "fr" && itinerary.name_fr}
                            {language === "sp" && itinerary.name_sp}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </>
            ) : (
              <div className="div-itin-rel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div>
                  <Link to="#">{translations.itinerary}</Link>
                </div>
                {isHovered && (
                  <div className="div-itin-abs">
                    <p>{translations.itineraryAccess}</p>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={openSidebar}></div>
    </>
  );
};

export default Sidebar;
