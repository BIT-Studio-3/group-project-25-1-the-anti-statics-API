import Joi from "joi";

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required().messages({
        "string.base": "First name should be a string",
        "string.empty": "First name cannot be empty",
        "string.min": "First name should have a minimum length of {#limit}",
        "string.max": "First name should have a maximum length of {#limit}",
        "any.required": "First name is required"
    }),
    lastName: Joi.string().min(2).max(100).required().messages({
        "string.base": "Last name should be a string",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name should have a minimum length of {#limit}",
        "string.max": "Last name should have a maximum length of {#limit}",
        "any.required": "Last name is required"
    }),
    emailAddress: Joi.string().email().min(10).max(100).required().messages({
        "string.base": "Email address should be a string",
        "string.empty": "Email address cannot be empty",
        "string.min": "Email address should have a minimum length of {#limit}",
        "string.max": "Email address should have a maximum length of {#limit}",
        "any.required": "Email address is required"
    }),

    password: Joi.string().pattern(/^[a-zA-Z0-9!#]+$/).min(8).max(50).required().messages({
        "string.base": "password should be a string",
        "string.empty": "password cannot be empty",
        "string.min": "password should have a minimum length of {#limit}",
        "string.max": "password should have a maximum length of {#limit}",
        "string.pattern.base": "Password can only contain letters, numbers, and ! #  .",
        "any.required": "password is required",
    }),

    role: Joi.string().valid("ADMIN", "BASIC").messages({
        "string.base": "Role should be a string",
        "any.only": "Role must be one of [ADMIN, BASIC]",
    }),

    status: Joi.string().valid("ACTIVE", "BASIC").messages({
        "string.base": "Status should be a string",
        "any.only": "Role must be one of [ACTIVE, INACTIVE]",
    }),
});

const validateSchema = (schema, isRequired = false) => {
    return (req, res, next) => {
        const { error } = isRequired
            ? schema.required().validate(req.body)
            : schema.validate(req.body);

        if (error) {
            return res.status(409).json({
                message: error.details[0].message,
            });
        }

        next();
    };
};

const validatePostUser = validateSchema(userSchema, true);
const validatePutUser = validateSchema(userSchema);

export { validatePostUser, validatePutUser };

