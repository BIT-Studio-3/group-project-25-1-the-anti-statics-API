import Joi from "joi";

const responseTeamSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "any.required": "Name is required"
    }),

    disasterId: Joi.string().uuid().required().messages({
        "string.base": "Disaster ID should be a valid UUID",
        "string.guid": "Disaster ID should be a valid UUID",
        "any.required": "Disaster ID is required"
    })
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

const validatePostResponseTeam = validateSchema(responseTeamSchema, true);
const validatePutResponseTeam = validateSchema(responseTeamSchema);

export { validatePostResponseTeam, validatePutResponseTeam };
