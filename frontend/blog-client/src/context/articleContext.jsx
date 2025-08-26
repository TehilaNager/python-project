import { useContext, createContext, useState, useEffect } from "react";
import articlesService from "../services/articleService";
import { useNavigate } from "react-router";
import { questionFeedback } from "../helpers/feedback";

const articleContext = createContext();
articleContext.displayName = "Articles";

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [term, setTerm] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const articles = await articlesService.getAllArticles();
      setArticles(articles);
      setFiltered(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
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
    setArticles((prev) => {
      const updated = [...prev, response];
      setFiltered(updated);
      return updated;
    });
  };

  const deleteArticle = async (id) => {
    try {
      const confirmed = await questionFeedback("The article has been deleted!");
      if (!confirmed) return;
      await articlesService.deleteArticle(id);
      setArticles((prev) => {
        const updated = prev.filter((art) => art.id !== id);
        setFiltered(updated);
        return updated;
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const updateArticle = async (id, values) => {
    try {
      const response = await articlesService.updateArticle(id, values);
      setArticles((prev) => {
        const updated = prev.map((art) => (art.id === id ? response : art));
        setFiltered(updated);
        return updated;
      });

      return response;
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!term) {
        setFiltered(articles);
        return;
      }
      const results = await articlesService.searchArticle(term);
      setFiltered(results);
      setSearchedTerm(term);
      navigate("/");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    if (term === "") {
      setFiltered(articles);
    }
  }, [term, articles]);

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
        term,
        setTerm,
        filtered,
        handleSearch,
        searchedTerm,
      }}
    >
      {children}
    </articleContext.Provider>
  );
}

export function useArticles() {
  return useContext(articleContext);
}
