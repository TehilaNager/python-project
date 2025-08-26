import httpService from "./httpService";

async function createTag(name) {
    const response = await httpService.post("/tags/", name);
    return response.data;
};

async function getAllTags(id) {
    const response = await httpService.get("/tags/");
    return response.data;
};

async function deleteTag(id) {
    await httpService.delete(`/tags/${id}/`);
    return { message: "The tag was successfully deleted." };
};


const tagsService = {
    createTag,
    getAllTags,
    deleteTag
};

export default tagsService;