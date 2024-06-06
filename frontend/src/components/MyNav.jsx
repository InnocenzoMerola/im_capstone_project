import { useState } from "react";
import { LOGOUT } from "../redux/actions";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MyNav = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };

  return (
    <div>
      <div className="top-nav-container">
        {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              I&M
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Link
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Disabled
                </Link>
              </li>
              <li className="parent nav-item">
                <Link to="/#">Itinerari</Link>
                <ul className="child">
                  <li className="parent">
                    <Link to="/#">
                      Spiagge <span className="expand">»</span>
                    </Link>
                    <ul className="child right">
                      <li>
                        <Link to="/#">Margellina</Link>
                      </li>
                      <li>
                        <Link to="/#">Lungomare</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="parent ">
                    <Link to="/#">
                      Cibo <span className="expand">»</span>
                    </Link>
                    <ul className="child right">
                      <li>
                        <Link to="/#">Pizza</Link>
                      </li>
                      <li>
                        <Link to="/#">Carne</Link>
                      </li>
                      <li>
                        <Link to="/#">Pesce</Link>
                      </li>
                      <li>
                        <Link to="/#">Fritto</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              {user ? (
                <>
                  <Nav.Link className="text-decoration-none align-items-center me-4">
                    
                    <Dropdown className="d-flex flex-column  align-items-center">
                      <img className="rounded-circle shadow-4-strong resized-avatar" alt="user" src={user.image} />

                      <Dropdown.Toggle className="bg-white text-dark border-0 p-0 d-flex align-items-center d-flex text-sm">
                        <p className="navbar-top">Tu </p>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="mt-2"
                        align="end"
                        style={{ maxHeight: "400px", width: "280px", overflowY: "auto" }}
                      >
                        <ListGroup className="mb-2">
                          <ListGroup.Item className="border-0">
                            <div className="d-flex align-items-start gap-2">
                              <img
                                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="draft_picture"
                                width="60px"
                                height={"60px"}
                                className="image_dropdown_navbar object-fit-cover"
                              />

                              <div>
                                <div className="d-flex flex-column align-items-start">
                                  <h5 className="fw-semibold m-0">Innocenzo</h5>
                                  <p className="text-secondary text-sm">Full Stack Developer</p>
                                </div>
                              </div>
                            </div>
                            <Link to={"/profile/660e54b613df0a001949f3df"}>
                              <Button className="w-100 p-0  rounded-pill bg-transparent text-primary" size="sm">
                                Visualizza Profilo
                              </Button>
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <h5>Account</h5>
                            <p className="m-1 text-secondary" style={{ fontSize: "14px" }}>
                              Prova Premium per 0 EUR
                            </p>
                            <p className="m-1 text-secondary" style={{ fontSize: "14px" }}>
                              Impostazioni e privacy
                            </p>
                            <p className="m-1 text-secondary" style={{ fontSize: "14px" }}>
                              Guida
                            </p>
                            <p className="m-1 text-secondary" style={{ fontSize: "14px" }}>
                              Lingua
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                  <span>{user.name}</span>
                  <img src={user.profile_img} alt="" className="" style={{ height: "50px", width: "50px" }} />
                  <button onClick={logout} className="btn btn-primary">
                    Esci
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-primary" to="/login">
                    Accedi
                  </Link>
                  <Link className="btn btn-primary" to="/register">
                    Registrati
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav> */}
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
          <h1 className="title">Benvenuti a Napoli</h1>
        </div>
      </div>

      <div className="menu-container">
        <div>
          <nav>
            <div className="container first">
              <ul className="nav-step-1">
                <li>
                  <Link className="menu-link">La grande Napoli</Link>
                </li>
                <li>
                  <Link className="menu-link">La grande Napoli</Link>
                </li>
                <li>
                  <Link className="menu-link">La grande Napoli</Link>
                </li>
                <li>
                  <Link className="menu-link">La grande Napoli</Link>
                </li>
              </ul>
            </div>
            <div className="container second">
              <div className="nav-step-2">
                <div className="user-slot">
                  <Link>
                    <p>ACCESSO UTENTE</p>
                  </Link>
                  <Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                    </svg>
                  </Link>
                </div>
                <div className="icon-container">
                  <div className="icon-div rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-linkedin text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                  </div>
                  <div className="icon-div rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-instagram text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </div>
                  <div className="icon-div rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope-fill text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                    </svg>
                  </div>
                  <div className="icon-div rounded-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-youtube text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div class="dropdown">
                    <button
                      class=" language-btn dropdown-toggle"
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
                        class="bi bi-caret-down-fill text-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </button>
                    <ul class="dropdown-menu language-btn">
                      <li>
                        <a class="dropdown-item" href="#">
                          <img src="/image/bandiera-Regno-Unito.png" alt="" />
                          English
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <img src="/image/bandiera-Francia.png" alt="" />
                          French
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <img src="/image/bandiera-Napoli.png" alt="" />
                          Napolitan
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="container third">
              <ul className="nav-step-3">
                <li className="parent nav-item">
                  <Link to="/#">Itinerari</Link>
                  <ul className="child">
                    <li className="parent">
                      <Link to="/#">
                        Spiagge <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Margellina</Link>
                        </li>
                        <li>
                          <Link to="/#">Lungomare</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="parent ">
                      <Link to="/#">
                        Cibo <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Pizza</Link>
                        </li>
                        <li>
                          <Link to="/#">Carne</Link>
                        </li>
                        <li>
                          <Link to="/#">Pesce</Link>
                        </li>
                        <li>
                          <Link to="/#">Fritto</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="parent nav-item">
                  <Link to="/#">Itinerari</Link>
                  <ul className="child">
                    <li className="parent">
                      <Link to="/#">
                        Spiagge <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Margellina</Link>
                        </li>
                        <li>
                          <Link to="/#">Lungomare</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="parent ">
                      <Link to="/#">
                        Cibo <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Pizza</Link>
                        </li>
                        <li>
                          <Link to="/#">Carne</Link>
                        </li>
                        <li>
                          <Link to="/#">Pesce</Link>
                        </li>
                        <li>
                          <Link to="/#">Fritto</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="parent nav-item">
                  <Link to="/#">Itinerari</Link>
                  <ul className="child">
                    <li className="parent">
                      <Link to="/#">
                        Spiagge <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Margellina</Link>
                        </li>
                        <li>
                          <Link to="/#">Lungomare</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="parent ">
                      <Link to="/#">
                        Cibo <span className="expand">»</span>
                      </Link>
                      <ul className="child right">
                        <li>
                          <Link to="/#">Pizza</Link>
                        </li>
                        <li>
                          <Link to="/#">Carne</Link>
                        </li>
                        <li>
                          <Link to="/#">Pesce</Link>
                        </li>
                        <li>
                          <Link to="/#">Fritto</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="parent nav-item">
                  <Link to="/#">Itinerari</Link>
                  <ul className="child">
                    <li>
                      <Link to="/#">Spiagge</Link>
                    </li>
                    <li>
                      <Link to="/#">Cibo</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyNav;
