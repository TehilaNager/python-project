import httpService from "./httpService";

async function getAllArticles() {
    const response = await httpService.get("/articles/")
    return response.data;
}

async function getArticleById(id) {
    const response = await httpService.get(`/articles/${id}`)
    return response.data;
}

const articlesService = {
    getAllArticles,
    getArticleById
};

export default articlesService;