import { Link } from "react-router";

function Card({ card }) {
  const formattedDate = new Date(card.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      className="hover-zoom card m-2 shadow-lg rounded-5 d-flex flex-column mb-3 text-light"
      style={{ width: "18rem", backgroundColor: "#040404ca" }}
    >
      <img
        src="https://cdn.prod.website-files.com/5fdab56e79a8041187b218f7/65d8b9c25c0deb0398ee2da1_toy-bricks-table_144627-48267.jpeg"
        className="card-img-top rounded-top-5"
        style={{ height: "14rem" }}
        alt={card.title}
      />
      <div className="card-body">
        <h5 className="card-title fs-3">{card.title}</h5>

        <p className="card-subtitle my-2 pb-2 clamp-3-lines">{card.text}</p>

        <p className="mb-3 text-warning" style={{ fontSize: "0.9rem" }}>
          <span className="fw-bold">Published:</span> {formattedDate}
        </p>

        <Link
          className="btn btn-outline-warning mb-2"
          to={`/article-details/${card.id}`}
        >
          Read more...
        </Link>
      </div>
    </div>
  );
}

export default Card;
