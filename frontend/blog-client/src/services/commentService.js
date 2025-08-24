import httpService from "./httpService";

async function getAllComments() {
    const response = await httpService.get("/comments/");
    return response.data;
};

async function getCommentById(id) {
    const response = await httpService.get(`/comments/${id}/`);
    return response.data;
};

async function createComment(id, value) {
    const response = await httpService.post(`/articles/${id}/comments/`, value);
    return response.data;
};

async function fetchCommentsByArticle(id) {
    const response = await httpService.get(`/articles/${id}/comments/`);
    return response.data;
};

// יש הרשאה רק למנהל, צריך בדיקה מהטוקן שזה מנהל
async function deleteComment(id) {
    await httpService.delete(`/comments/${id}/`);
    console.log({ message: "The comment was successfully deleted." });
    return { message: "The comment was successfully deleted." };
};


const commentsService = {
    getAllComments,
    getCommentById,
    createComment,
    fetchCommentsByArticle,
    deleteComment
};

export default commentsService;