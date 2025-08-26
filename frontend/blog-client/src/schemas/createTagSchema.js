import Joi from "joi";

function createTagSchema() {
    return Joi.object({
        name: Joi.string().min(2).max(32).allow("").messages({
            "string.min": "Tag name must be at least 2 characters",
            "string.max": "Tag name must be at most 32 characters",
        }),
    });;
}

export default createTagSchema;


