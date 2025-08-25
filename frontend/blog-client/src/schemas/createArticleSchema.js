import Joi from "joi"

function createArticleSchema() {
    return Joi.object({
        title: Joi.string().min(5).max(100).pattern(/^[a-zA-Z].*$/).required()
            .messages({
                "string.empty": "Title is required",
                "string.min": "Title must be at least 5 characters",
                "string.max": "Title cannot exceed 100 characters",
                "string.pattern.base": "Title must start with a letter",
            }),
        text: Joi.string().min(5).required().messages({
            "string.empty": "Text is required",
            "string.min": "Text must be at least 5 characters",
        }),
        status: Joi.string().valid("draft", "published", "archived").required()
            .messages({
                "any.only": "Status must be one of draft, published, archived",
                "string.empty": "Status is required",
            }),
        tags: Joi.array().items(Joi.number()).messages({
            "array.base": "Tags must be an array of tag IDs",
        }),
    });
}


export default createArticleSchema;
