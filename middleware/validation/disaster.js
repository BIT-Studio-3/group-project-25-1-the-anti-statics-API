import { DisasterSeverity, DisasterStatus, DisasterType } from "@prisma/client"; //Import enums
import Joi from "joi";

const disasterSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        "string.base": "Title should be a string",
        "string.empty": "Title cannot be empty",
        "string.min": "Title should have a minimum length of {#limit}",
        "string.max": "Title should have a maximum length of {#limit}",
        "any.required": "Title is required"
    }),

    type: Joi.string().valid(...Object.values(DisasterType)).required().messages({
        "string.base": "Type should be a string",
        "any.only": `Type must be one of the following: ${Object.values(DisasterType)}`,
        "any.required": "Type is required"
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
    }),

    status: Joi.string().valid(...Object.values(DisasterStatus)).required().messages({
        "string.base": "Status should be a string",
        "any.only": `Status must be one of the following: ${Object.values(DisasterStatus)}`,
        "any.required": "Status is required"
    }),

    severity: Joi.string().valid(...Object.values(DisasterSeverity)
    ).required().messages({
        "string.base": "Severity should be a string",
        "any.only": `Severity must be one of the following: ${Object.values(DisasterSeverity)}`,
        "any.required": "Severity is required"
    }),

    controllerId: Joi.string().uuid().required().messages({
        "string.base": "Controller ID should be a valid UUID",
        "any.required": "Controller ID is required"
    }),

    startTime: Joi.date().required().messages({
        "date.base": "Start time should be a valid date",
        "any.required": "Start time is required"
    }),

    endTime: Joi.date().optional().messages({
        "date.base": "End time should be a valid date"
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

const validatePostDisaster = validateSchema(disasterSchema, true);
const validatePutDisaster = validateSchema(disasterSchema);

export { validatePostDisaster, validatePutDisaster };
