import Joi from "joi";

const alertSchema = Joi.object({
    reporterName: Joi.string().min(3).max(255).required().messages({
        "string.base": "Reporter name should be a string",
        "string.empty": "Reporter name cannot be empty",
        "string.min": "Reporter name should have a minimum length of {#limit}",
        "string.max": "Reporter name should have a maximum length of {#limit}",
        "any.required": "Reporter name is required"
    }),

    damageType: Joi.string().min(3).max(100).required().messages({
        "string.base": "Damage type should be a string",
        "string.empty": "Damage type cannot be empty",
        "string.min": "Damage type should have a minimum length of {#limit}",
        "string.max": "Damage type should have a maximum length of {#limit}",
        "any.required": "Damage type is required"
    }),

    damageLevel: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "Damage level should be a number",
        "number.min": "Damage level should be between 1 and 5",
        "number.max": "Damage level should be between 1 and 5",
        "any.required": "Damage level is required"
    }),

    location: Joi.string().min(3).max(100).required().messages({
        "string.base": "Location should be a string",
        "string.empty": "Location cannot be empty",
        "string.min": "Location should have a minimum length of {#limit}",
        "string.max": "Location should have a maximum length of {#limit}",
        "any.required": "Location is required"
    }),

    countAffected: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "Count affected should be a number",
        "number.min": "Count affected should be between 1 and 5",
        "number.max": "Count affected should be between 1 and 5",
        "any.required": "Count affected is required"
    }),

    cause: Joi.string().min(3).max(500).required().messages({
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
const validatePostDamage = validateSchema(alertSchema, true);
const validatePutDamage = validateSchema(alertSchema);

export { validatePostDamage, validatePutDamage };