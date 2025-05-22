import Joi from "joi";

const responseTeamSchema = Joi.object({
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

const validatePostTeam = validateSchema(responseTeamSchema, true);
const validatePutTeam = validateSchema(responseTeamSchema);

export { validatePostTeam, validatePutTeam };
