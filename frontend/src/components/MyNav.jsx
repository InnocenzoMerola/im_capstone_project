import { useEffect, useRef, useState } from "react";
import { LOGOUT } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "../pages/profile/Login";

const MyNav = function () {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showLoginForm, setShowLoginForm] = useState(false);

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
      if (showLoginForm && !document.querySelector(".login-container")) {
        handleCloseLoginForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginForm]);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };

  // CATEGORIE

  useEffect(() => {
    fetch(`/api/v1/categories`)
      .then((response) => {
        if (!response.ok) navigate("/404");
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => {
        console.log("Errore nella chiamata api", error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="top-back-img">
          <div className="top-nav-container">
            {user && (
              <>
                <span className="text-white">{user.name}</span>
                {/* <img src={user.profile_img} alt="" className="" style={{ height: "50px", width: "50px" }} /> */}
                <button onClick={logout} className="btn btn-primary">
                  Esci
                </button>
              </>
            )}{" "}
            <div className="container">
              <div>
                <div className="nav-top-div">
                  <div>
                    <h4 className="my-logo">I&M</h4>
                  </div>
                  <div className="logo-div">
                    <img src={"/image/Stemma-napoli.png"} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="title-container">
            <div className="title-div">
              <Link to="/">
                <h1 className="title">Benvenuti a Napoli</h1>
              </Link>
            </div>
          </div>
          {/* </div>

        <div className="menu-container"> */}
          <div className="nav-transp"></div>
          <div className="menu-container">
            <nav>
              <div className="container first">
                <ul className="row g-0 nav-step-1">
                  <li className="col-3">
                    <Link className="menu-link">La grande Napoli</Link>
                  </li>
                  <li className="col-3">
                    <Link className="menu-link">La grande Napoli</Link>
                  </li>
                  <li className="col-3">
                    <Link className="menu-link">La grande Napoli</Link>
                  </li>
                  <li className="col-3">
                    <Link className="menu-link">La grande Napoli</Link>
                  </li>
                </ul>
              </div>
              <div className="container second">
                <div className="nav-step-2">
                  <div className="user-slot">
                    {!user && (
                      <>
                        <button onClick={handleShowLoginForm} className="btn-none">
                          <p>ACCESSO UTENTE</p>
                        </button>
                        <button className="btn-none" onClick={handleShowLoginForm}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-lock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                          </svg>
                        </button>
                        {showLoginForm && (
                          <div ref={loginRef}>
                            <Login onCloseLogin={handleCloseLoginForm} onShowRegister={handleShowRegisterForm} />
                          </div>
                        )}
                      </>
                    )}
                    {user && (
                      <Link className="d-flex" to="/profile">
                        <img
                          src={user.profile_img ? user.profile_img : "/image/profile-image.png"}
                          alt=""
                          className="nav-user-img"
                        />
                        <button className="btn-none">
                          <p className="nav-user-name">{user.name}</p>
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="icon-container">
                    <div className="icon-div rounded-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-linkedin"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                      </svg>
                    </div>
                    <div className="icon-div rounded-circle">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram text-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                      </svg> */}
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0)"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <rect
                            x="2"
                            y="2"
                            width="28"
                            height="28"
                            rx="6"
                            fill="url(#paint0_radial_87_7153)"
                          ></rect>{" "}
                          <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>{" "}
                          <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect>{" "}
                          <path
                            d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                            fill="white"
                          ></path>{" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                            fill="white"
                          ></path>{" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
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
                              <stop stop-color="#B13589"></stop> <stop offset="0.79309" stop-color="#C62F94"></stop>{" "}
                              <stop offset="1" stop-color="#8A3AC8"></stop>{" "}
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
                              <stop stop-color="#E0E8B7"></stop> <stop offset="0.444662" stop-color="#FB8A2E"></stop>{" "}
                              <stop offset="0.71474" stop-color="#E2425C"></stop>{" "}
                              <stop offset="1" stop-color="#E2425C" stop-opacity="0"></stop>{" "}
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
                              <stop offset="0.156701" stop-color="#406ADC"></stop>{" "}
                              <stop offset="0.467799" stop-color="#6A45BE"></stop>{" "}
                              <stop offset="1" stop-color="#6A45BE" stop-opacity="0"></stop>{" "}
                            </radialGradient>{" "}
                          </defs>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="icon-div rounded-circle">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-envelope-fill text-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                      </svg> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Gmail"
                        role="img"
                        viewBox="0 0 512 512"
                        fill="#000000"
                        width="17"
                        height="17"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <rect width="512" height="512" rx="15%" fill="#1a212300"></rect>
                          <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path>
                          <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path>
                          <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path>
                          <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path>
                          <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="icon-div rounded-circle">
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
                    </div>
                  </div>
                  <div>
                    <div className="dropdown">
                      <button
                        className=" language-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/image/bandiera-Italia.png" alt="" />
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
                      <ul className="dropdown-menu language-btn">
                        <li>
                          <Link className="dropdown-item" href="#">
                            <img src="/image/bandiera-Regno-Unito.png" alt="" />
                            English
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            <img src="/image/bandiera-Francia.png" alt="" />
                            French
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            <img src="/image/bandiera-Napoli.png" alt="" />
                            Napolitan
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container third">
                <ul className="nav-step-3">
                  <li className="parent nav-item big-parent">
                    <Link to="/#">Scopri Napoli</Link>
                    <ul className="child">
                      <li>
                        <Link to="/#">La Storia</Link>
                      </li>
                      <li>
                        <Link to="/#">Partenope</Link>
                      </li>
                      <li>
                        <Link to="/#">Vesuvio</Link>
                      </li>
                      <li>
                        <Link to="/#">Le voci di Napoli</Link>
                      </li>
                    </ul>
                  </li>
                  {categories.map((category) => (
                    <li className="parent nav-item big-parent" key={category.id}>
                      <Link to={`/category/${category.id}`}>{category.name}</Link>

                      <ul className="child">
                        {category.children.map((childCategory) => (
                          <li key={childCategory.id}>
                            <Link to={`/category/${childCategory.id}`}>{childCategory.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="nav-transp"></div>
        </div>
      </div>
    </>
  );
};

export default MyNav;
