import { Link, useParams } from "react-router";
import articlesService from "../services/articleService";
import { useEffect, useState } from "react";
import { useComments } from "../context/commentContext";
import { useAuth } from "../context/authContext";

function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const { comments } = useComments();
  const { isLoggedIn } = useAuth();
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
      <div className="d-flex justify-content-between">
        <Link to={"/"} className="back-btn">
          &larr; Back
        </Link>
        {/* רק מנהלים */}
        <div>
          <button type="button" className="btn btn-warning mx-2">
            Edit
          </button>
          <button type="button" className="btn btn-danger mx-2">
            Delete
          </button>
        </div>
      </div>

      <div className="article-card">
        <h1 className="article-title mb-4">{article?.title}</h1>

        <div className="article-meta">
          <span>
            👤 <strong>Author:</strong> {article?.author_username}
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

        <div className="tags">
          {article?.tags_names.map((tagName) => (
            <span key={tagName} className="tag">
              {tagName}
            </span>
          ))}
        </div>
      </div>

      <div className="comments-section mt-5">
        <h3 className="mb-4 fw-bold">💬 Comments:</h3>

        {comments.filter((comment) => comment.article === article?.id)
          .length === 0 ? (
          <p className="text-muted">No comments yet...</p>
        ) : (
          comments
            .filter((comment) => comment.article === article?.id)
            .map((comment) => (
              <div
                key={comment.id}
                className="comment d-flex mb-3 p-3 rounded shadow-sm bg-light"
              >
                <div
                  className="avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "40px", height: "40px", flexShrink: 0 }}
                >
                  {comment.username[0]?.toUpperCase()}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold mb-2">
                    <span className="text-decoration-underline">
                      {comment.username}
                    </span>{" "}
                    <small
                      className="text-muted mx-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {new Date(comment.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-0">{comment.text}</p>

                  {/* רק מנהלים */}
                  <div className="d-flex justify-content-end mt-1">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}

        {isLoggedIn && (
          <div className="add-comment mt-5">
            <h5 className="mb-3">✍️ Add a new comment:</h5>
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Write a comment..."
              style={{ resize: "none" }}
            ></textarea>
            <button className="btn btn-primary">Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetails;
