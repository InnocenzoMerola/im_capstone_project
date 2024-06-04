import { useState } from "react";

import { Link } from "react-router-dom";

const MyNav = function () {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                <a href="#">Itinerari</a>
                <ul className="child">
                  <li className="parent">
                    <a href="#">
                      Spiagge <span className="expand">»</span>
                    </a>
                    <ul className="child right">
                      <li>
                        <a href="#">Margellina</a>
                      </li>
                      <li>
                        <a href="#">Lungomare</a>
                      </li>
                    </ul>
                  </li>
                  <li className="parent ">
                    <a href="#">
                      Cibo <span className="expand">»</span>
                    </a>
                    <ul className="child right">
                      <li>
                        <a href="#">Pizza</a>
                      </li>
                      <li>
                        <a href="#">Carne</a>
                      </li>
                      <li>
                        <a href="#">Pesce</a>
                      </li>
                      <li>
                        <a href="#">Fritto</a>
                      </li>
                      {/* <li className="parent">
                  <a href="#">
                    Level 2 - Menu 3<span className="expand">»</span>
                  </a>
                  <ul className="child">
                    <li>
                      <a href="#">Level 3 - Menu 1</a>
                    </li>
                    <li>
                      <a href="#">Level 3 - Menu 2</a>
                    </li>
                  </ul>
                </li> */}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MyNav;
