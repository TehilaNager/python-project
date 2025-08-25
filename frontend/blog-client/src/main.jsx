import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CommentsProvider } from "./context/commentContext.jsx";
import { ArticlesProvider } from "./context/articleContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext.jsx";
import { TagProvider } from "./context/tagContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ArticlesProvider>
          <CommentsProvider>
            <TagProvider>
              <ToastContainer />
              <App />
            </TagProvider>
          </CommentsProvider>
        </ArticlesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
