import { useContext, createContext, useState, useEffect } from "react";
import articlesService from "../services/articleService";

const articleContext = createContext();
articleContext.displayName = "Articles";

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const articles = await articlesService.getAllArticles();
    setArticles(articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const createArticle = async (values) => {
    const response = await articlesService.createArticle(values);
    setArticles([...articles, response]);
  };

  return (
    <articleContext.Provider value={{ articles, createArticle }}>
      {children}
    </articleContext.Provider>
  );
}

export function useArticles() {
  return useContext(articleContext);
}
