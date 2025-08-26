import { useArticles } from "../context/articleContext";
import { useAuth } from "../context/authContext";
import Logo from "./common/logo";
import { NavLink } from "react-router";

function Navbar() {
  const { isLoggedIn, logout, getUser, isAdmin } = useAuth();
  const { term, setTerm, handleSearch } = useArticles();
  const userName = getUser()?.username;
  const admin = isAdmin();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">
        <Logo />

        {admin && (
          <NavLink
            to="/manage-tags"
            className="nav-link fw-semibold fs-6 px-4 text-white"
            style={{ fontSize: "1.2rem" }}
          >
            Manage Tags
          </NavLink>
        )}

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
          <form
            className="d-flex position-relative me-4 ms-auto"
            role="search"
            onSubmit={handleSearch}
          >
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
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="btn btn-outline-warning ms-3" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav mb-2 mb-md-0">
            {isLoggedIn ? (
              <div
                className="dropdown text-center"
                style={{ display: "inline-block", position: "relative" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1896/1896513.png"
                  alt="Profile"
                  className="dropdown-toggle mx-3"
                  data-bs-toggle="dropdown"
                  style={{
                    width: "50px",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
                <ul
                  className="dropdown-menu shadow text-center"
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <li className="border-bottom text-primary-emphasis fw-semibold py-2 rounded-top">
                    <i className="bi bi-person-circle me-1"></i> {userName}
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger px-4 py-2"
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> Log out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link fw-semibold fs-6 px-4"
                    to="/login"
                    style={{ fontSize: "1.05rem" }}
                  >
                    <i className="bi bi-person me-1"></i> Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link fw-semibold fs-6 px-4"
                    to="/register"
                    style={{ fontSize: "1.05rem" }}
                  >
                    <i className="bi bi-person-plus me-1"></i> Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
