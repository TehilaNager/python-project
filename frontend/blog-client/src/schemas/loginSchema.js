import Joi from "joi"

function loginSchema() {
    return Joi.object({
        username: Joi.string().min(2).max(30).required().label("User Name"),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
            .required()
            .label("Password")
            .messages({
                "string.pattern.base":
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.",
            })
    });
}


export default loginSchema;
