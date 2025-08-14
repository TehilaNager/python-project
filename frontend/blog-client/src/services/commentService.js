import httpService from "./httpSrvice";

async function getAllComments() {
    const response = await httpService.get("/comments/");
    return response.data;
}
async function getCommentById(id) {
    const response = await httpService.get(`/comments/${id}/`);
    return response.data;
}

const commentsService = {
    getAllComments,
    getCommentById
}

export default commentsService;