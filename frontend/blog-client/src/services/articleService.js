import httpService from "./httpService";

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

async function createArticle(values) {
    const response = await httpService.post("/articles/", values);
    return response.data;
};

async function updateArticle(id, values) {
    const response = await httpService.put(`/articles/${id}/`, values);
    return response.data;
};

async function deleteArticle(id) {
    await httpService.delete(`/articles/${id}/`);
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