import { useState } from "react";

export function Header() {
  const [isShowingOffcanvas, setIsShowingOffcanvas] = useState(false);

  function toggleOffcanvas() {
    setIsShowingOffcanvas(!isShowingOffcanvas);
  }

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          ⚙️ Projects Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
          onClick={toggleOffcanvas}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`offcanvas offcanvas-end text-bg-dark ${
            isShowingOffcanvas ? "show" : ""
          }`}
          tabIndex={-1}
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              ⚙️ Projects Manager
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={toggleOffcanvas}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            {/*<form className="d-flex mt-3" role="search">*/}
            {/*  <input*/}
            {/*    className="form-control me-2"*/}
            {/*    type="search"*/}
            {/*    placeholder="Search"*/}
            {/*    aria-label="Search"*/}
            {/*  />*/}
            {/*  <button className="btn btn-success" type="submit">*/}
            {/*    Search*/}
            {/*  </button>*/}
            {/*</form>*/}
          </div>
        </div>
      </div>
    </nav>
  );
}
