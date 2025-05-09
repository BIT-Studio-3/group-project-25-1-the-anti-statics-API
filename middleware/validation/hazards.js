import Joi from "joi";

const alertSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "any.required": "Name is required"
    }),

    type: Joi.string().min(3).max(100).required().messages({
        "string.base": "Type should be a string",
        "string.empty": "Type cannot be empty",
        "string.min": "Type should have a minimum length of {#limit}",
        "string.max": "Type should have a maximum length of {#limit}",
        "any.required": "Type is required"
    }),

    level: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "Level should be a number",
        "number.min": "Level should be between 1 and 5",
        "number.max": "Level should be between 1 and 5",
        "any.required": "Level is required"
    }),

    city: Joi.string().min(3).max(100).required().messages({
        "string.base": "City should be a string",
        "string.empty": "City cannot be empty",
        "string.min": "City should have a minimum length of {#limit}",
        "string.max": "City should have a maximum length of {#limit}",
        "any.required": "City is required"
    }),

    location: Joi.string().min(3).max(500).required().messages({
        "string.base": "Location should be a string",
        "string.empty": "Location cannot be empty",
        "string.min": "Location should have a minimum length of {#limit}",
        "string.max": "Location should have a maximum length of {#limit}",
        "any.required": "Location is required"
    }),

    description: Joi.string().min(3).max(500).required().messages({
        "string.base": "Description should be a string",
        "string.empty": "Description cannot be empty",
        "string.min": "Description should have a minimum length of {#limit}",
        "string.max": "Description should have a maximum length of {#limit}",
        "any.required": "Description is required"
    })
});

// Validation function using your previous setup
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

// Define POST and PUT validation middleware
const validatePostHazard = validateSchema(alertSchema, true);
const validatePutHazard = validateSchema(alertSchema);

export { validatePostHazard, validatePutHazard };