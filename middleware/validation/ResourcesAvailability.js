import Joi from "joi";


// Define the Alert schema based on the model structure
const resourceSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "any.required": "Name is required"
    }),

    // contactInfo: Joi.string().min(3).max(100).required().messages({
    //     "string.base": "Contact info should be a string",
    //     "string.empty": "Contact info cannot be empty",
    //     "string.min": "Contact info should have a minimum length of {#limit}",
    //     "string.max": "Contact info should have a maximum length of {#limit}",
    //     "any.required": "Contact info is required"
    // }),

    assistance: Joi.string().min(3).max(100).required().messages({
        "string.base": "Assistance should be a string",
        "string.empty": "Assistance cannot be empty",
        "string.min": "Assistance should have a minimum length of {#limit}",
        "string.max": "Assistance should have a maximum length of {#limit}",
        "any.required": "Assistance is required"
    }),

    conditions: Joi.string().min(3).max(500).optional().messages({
        "string.base": "Cause should be a string",
        "string.empty": "Cause cannot be empty",
        "string.min": "Cause should have a minimum length of {#limit}",
        "string.max": "Cause should have a maximum length of {#limit}",
        "any.required": "Cause is required"
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
const validatePostResource = validateSchema(resourceSchema, true);
const validatePutResource = validateSchema(resourceSchema);

export { validatePostResource, validatePutResource };
