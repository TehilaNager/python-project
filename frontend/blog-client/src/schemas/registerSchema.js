import Joi from "joi"

function registerSchema() {
    return Joi.object({
        username: Joi.string().min(2).max(30).required().label("User Name"),
        email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
            .required()
            .label("Password")
            .messages({
                "string.pattern.base":
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.",
            }),
        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .label("Confirm Password")
            .messages({ "any.only": "Passwords must match" }),
    });
}


export default registerSchema;
