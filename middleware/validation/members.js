import Joi from "joi";

const teamMembershipSchema = Joi.object({
    responseTeamId: Joi.string().uuid().required().messages({
        "string.base": "Response Team ID should be a valid UUID",
        "string.guid": "Response Team ID must be a valid UUID",
        "any.required": "Response Team ID is required"
    }),

    userId: Joi.string().uuid().required().messages({
        "string.base": "User ID should be a valid UUID",
        "string.guid": "User ID must be a valid UUID",
        "any.required": "User ID is required"
    }),

    role: Joi.string().min(2).max(100).required().messages({
        "string.base": "Role should be a string",
        "string.empty": "Role cannot be empty",
        "string.min": "Role should have a minimum length of {#limit}",
        "string.max": "Role should have a maximum length of {#limit}",
        "any.required": "Role is required"
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

const validatePostTeamMembership = validateSchema(teamMembershipSchema, true);
const validatePutTeamMembership = validateSchema(teamMembershipSchema);

export { validatePostTeamMembership, validatePutTeamMembership };

