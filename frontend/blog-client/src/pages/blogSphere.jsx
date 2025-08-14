import PageHeader from "../components/common/pageHeader";
import Card from "../components/card";
import { useArticles } from "../context/articleContext";

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
    </div>
  );
}

export default BlogSphere;
