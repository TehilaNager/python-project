import httpService from "./httpService";

async function getAllComments() {
    const response = await httpService.get("/comments/");
    return response.data;
};

async function getCommentById(id) {
    const response = await httpService.get(`/comments/${id}/`);
    return response.data;
};

async function createComment(id, values) {
    const response = await httpService.post(`/articles/${id}/comments/`, values);
    return response.data;
};

async function fetchCommentsByArticle(id) {
    const response = await httpService.get(`/articles/${id}/comments/`);
    return response.data;
};

async function deleteComment(id) {
    await httpService.delete(`/comments/${id}/`);
    return { message: "The comment was successfully deleted." };
};

async function updateComment(id, values) {
    const response = await httpService.put(`/comments/${id}/`, values);
    return response.data;
};


const commentsService = {
    getAllComments,
    getCommentById,
    createComment,
    fetchCommentsByArticle,
    deleteComment,
    updateComment
};

export default commentsService;