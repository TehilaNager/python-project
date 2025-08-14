import { NavLink } from "react-router";

function Logo() {
  return (
    <NavLink className="navbar-brand d-flex align-items-center" to="/">
      <i className="bi bi-pen me-2 text-warning fs-2"></i>
      <span className="fw-bold fs-2">BlogSphere</span>
    </NavLink>
  );
}

export default Logo;
