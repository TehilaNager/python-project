import PageHeader from "../components/common/pageHeader";
import Card from "../components/card";
import { useArticles } from "../context/articleContext";
import { Link } from "react-router";
import { useAuth } from "../context/authContext";
import { useMemo, useState } from "react";

function BlogSphere() {
  const { filtered, searchedTerm } = useArticles();
  const { isAdmin } = useAuth();
  const admin = isAdmin();

  const [visibleCount, setVisibleCount] = useState(3);

  const sortedArticles = useMemo(() => {
    return [...filtered].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [filtered]);

  const displayedArticles = sortedArticles.slice(0, visibleCount);

  const hasMore = visibleCount < sortedArticles.length;

  return (
    <div className="container">
      <PageHeader title="All Articles" classTitle="my-5 text-left fw-bold" />

      <div className="d-flex justify-content-evenly flex-wrap">
        {displayedArticles.length > 0 ? (
          displayedArticles.map((card) => <Card key={card.id} card={card} />)
        ) : searchedTerm ? (
          <p className="fs-3">
            No articles found for <strong>"{searchedTerm}"</strong>.
          </p>
        ) : (
          <p className="fs-3">No articles...</p>
        )}
      </div>
      {sortedArticles.length > 3 && (
        <div className="text-center my-4 d-flex justify-content-center">
          <button
            className="btn btn-warning text-dark fw-bold px-4 shadow-sm"
            onClick={() => setVisibleCount(sortedArticles.length)}
            disabled={!hasMore}
          >
            {hasMore ? "Load more" : "All articles loaded"}
          </button>
        </div>
      )}

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
