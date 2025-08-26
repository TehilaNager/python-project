import PageHeader from "../components/common/pageHeader";
import Card from "../components/card";
import { useArticles } from "../context/articleContext";
import { Link } from "react-router";
import { useAuth } from "../context/authContext";

function BlogSphere() {
  const { filtered, searchedTerm } = useArticles();
  const { isAdmin } = useAuth();
  const admin = isAdmin();

  return (
    <div className="container">
      <PageHeader title="All Articles" classTitle="my-5 text-left fw-bold" />

      <div className="d-flex justify-content-evenly flex-wrap">
        {filtered.length > 0 ? (
          filtered.map((card) => <Card key={card.id} card={card} />)
        ) : searchedTerm ? (
          <p className="fs-3">
            No articles found for <strong>"{searchedTerm}"</strong>.
          </p>
        ) : (
          <p className="fs-3">No articles...</p>
        )}
      </div>

      {admin && (
        <Link
          className="btn-add-article btn btn-warning rounded-circle p-4 lh-1 bi bi-plus-lg"
          to="/create-article"
        ></Link>
      )}
    </div>
  );
}

export default BlogSphere;
