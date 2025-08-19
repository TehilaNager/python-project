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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CommentsProvider>
          <ArticlesProvider>
            <ToastContainer />
            <App />
          </ArticlesProvider>
        </CommentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
