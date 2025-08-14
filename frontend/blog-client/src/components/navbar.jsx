import Logo from "./common/logo";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Logo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex position-relative me-5 ms-auto" role="search">
            <i
              className="bi bi-search text-secondary position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
              }}
            ></i>
            <input
              className="form-control ps-5"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-outline-warning ms-3" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold fs-6 px-3"
                to="/login"
                style={{ fontSize: "1.05rem" }}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold fs-6 px-3"
                to="/register"
                style={{ fontSize: "1.05rem" }}
              >
                Register
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold fs-6 px-3"
                to="/register"
                style={{ fontSize: "1.05rem" }}
              >
                Logout
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
