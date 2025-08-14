import { Link } from "react-router";

function Card() {
  return (
    <div
      className="hover-zoom card m-2 shadow-lg rounded-5 d-flex flex-column mb-3 text-light"
      style={{ width: "18rem", backgroundColor: "#040404ca" }}
    >
      <img
        src="https://cdn.prod.website-files.com/5fdab56e79a8041187b218f7/65d8b9c25c0deb0398ee2da1_toy-bricks-table_144627-48267.jpeg"
        className="card-img-top rounded-top-5"
        style={{ height: "14rem" }}
        // alt=
      />
      <div className="card-body">
        <h5 className="card-title fs-3">hello world</h5>

        <p className="card-subtitle my-2 pb-2 clamp-3-lines">
          adable content of a page when looking at its layout. adable content of
          a page when looking at its layout.
        </p>

        <Link
          className="btn btn-outline-warning mb-2"
          // to={`/article-details/${}`}
        >
          Read more...
        </Link>
      </div>
    </div>
  );
}

export default Card;
