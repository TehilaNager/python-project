import { Link, useParams } from "react-router";
import articlesService from "../services/articleService";
import { useEffect, useState } from "react";

function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticleById = async () => {
      const response = await articlesService.getArticleById(id);
      setArticle(response);
    };
    fetchArticleById();
  }, [id]);

  return (
    <div className="container my-5 article-container">
      <Link to={"/"} className="back-btn">
        &larr; Back
      </Link>

      <div className="article-card">
        <h1 className="article-title mb-4">{article?.title}</h1>

        <div className="article-meta">
          <span>
            👤 <strong>Author:</strong> {article?.author_id}
          </span>
          <span>
            🕒 <strong>Created:</strong>{" "}
            {new Date(article?.created_at).toLocaleDateString()}
          </span>
          <span>
            ✏️ <strong>Updated:</strong>{" "}
            {new Date(article?.updated_at).toLocaleDateString()}
          </span>
          <span>
            📄 <strong>Status:</strong> {article?.status}
          </span>
        </div>

        <p className="article-text">{article?.text}</p>

        {article?.tags && article?.tags.length > 0 && (
          <div className="tags">
            {article.tags.map((tagId) => (
              <span key={tagId} className="tag">
                Tag #{tagId}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetails;
