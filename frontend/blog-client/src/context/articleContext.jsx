import { useContext, createContext, useState, useEffect } from "react";
import articlesService from "../services/articleService";
import { useNavigate } from "react-router";
import { questionFeedback } from "../helpers/feedback";

const articleContext = createContext();
articleContext.displayName = "Articles";

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const articles = await articlesService.getAllArticles();
    setArticles(articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticleById = async (id) => {
    const response = await articlesService.getArticleById(id);
    setArticle(response);
    return response;
  };

  const createArticle = async (values) => {
    const response = await articlesService.createArticle(values);
    setArticles([...articles, response]);
  };

  const deleteArticle = async (id) => {
    try {
      const confirmed = await questionFeedback("The article has been deleted!");
      if (!confirmed) return;
      await articlesService.deleteArticle(id);
      setArticles(articles.filter((art) => art.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const updateArticle = async (id, values) => {
    try {
      const response = await articlesService.updateArticle(id, values);
      setArticles(articles.map((art) => (art.id === id ? response : art)));
      return response;
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <articleContext.Provider
      value={{
        articles,
        article,
        createArticle,
        fetchArticleById,
        fetchArticles,
        deleteArticle,
        updateArticle,
        setArticles,
      }}
    >
      {children}
    </articleContext.Provider>
  );
}

export function useArticles() {
  return useContext(articleContext);
}
