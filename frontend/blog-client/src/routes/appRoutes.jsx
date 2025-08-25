import { Routes, Route } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import BlogSphere from "../pages/blogSphere";
import ArticleDetails from "../pages/articleDetails";
import CreateArticle from "../pages/createArticle";
import ManageTags from "../pages/manageTags";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogSphere />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/article-details/:id" element={<ArticleDetails />} />
      <Route path="/create-article/" element={<CreateArticle />} />
      <Route path="//manage-tags" element={<ManageTags />} />
    </Routes>
  );
}

export default AppRoutes;
