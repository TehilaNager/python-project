import PageHeader from "../components/common/pageHeader";
import Card from "../components/card";
import { useArticles } from "../context/articleContext";
import { Link } from "react-router";

function BlogSphere() {
  const { articles } = useArticles();

  return (
    <div className="container">
      <PageHeader title="All Articles" classTitle="my-5 text-left fw-bold" />

      <div className="d-flex justify-content-evenly flex-wrap">
        {articles.length > 0 ? (
          articles.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p className="fs-3">No articles...</p>
        )}
      </div>
      {/* לתת הרשאה רק למנהל */}
      <Link
        className="btn-add-article btn btn-warning rounded-circle p-4 lh-1 bi bi-plus-lg"
        to="/create-article"
      ></Link>
    </div>
  );
}

export default BlogSphere;
