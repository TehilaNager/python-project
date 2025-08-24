import httpService from "./httpService";
import userService from "./userService";

async function getAllArticles() {
    const response = await httpService.get("/articles/");
    return response.data;
};

async function getArticleById(id) {
    const response = await httpService.get(`/articles/${id}`);
    return response.data;
};

async function searchArticle(value) {
    const response = await httpService.get(`/articles/?search=${value}`);
    return response.data;
};

// יש הרשאה רק למנהל, צריך בדיקה מהטורן שזה מנהל
async function createArticle(values) {
    // if (!userService.isAdmin()) {
    //     throw new Error("Only an admin can perform this action: creating an article.");
    // };

    const response = await httpService.post("/articles/", values);
    return response.data;
};

// יש הרשאה רק למנהל, צריך בדיקה מהטורן שזה מנהל
async function updateArticle(id, values) {
    const response = await httpService.put(`/articles/${id}/`, values);
    return response.data;
};

// יש הרשאה רק למנהל, צריך בדיקה מהטורן שזה מנהל
async function deleteArticle(id) {
    await httpService.delete(`/articles/${id}`);
    return { message: "The article was successfully deleted." };
};

const articlesService = {
    getAllArticles,
    getArticleById,
    searchArticle,
    createArticle,
    updateArticle,
    deleteArticle
};

export default articlesService;