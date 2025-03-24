import Joi from "joi";

// Define the Alert schema based on the model structure
const alertSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.base": "title should be a string",
    "string.empty": "title cannot be empty",
    "string.min": "title should have a minimum length of {#limit}",
    "string.max": "title should have a maximum length of {#limit}",
    "any.required": "title is required"
  }),
  
  emergencyType: Joi.string().min(3).max(100).required().messages({
    "string.base": "emergencyType should be a string",
    "string.empty": "emergencyType cannot be empty",
    "string.min": "emergencyType should have a minimum length of {#limit}",
    "string.max": "emergencyType should have a maximum length of {#limit}",
    "any.required": "emergencyType is required"
  }),

  alertLevel: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "alertLevel should be a number",
    "number.min": "alertLevel should be between 1 and 5",
    "number.max": "alertLevel should be between 1 and 5",
    "any.required": "alertLevel is required"
  }),

  region: Joi.string().min(3).max(100).required().messages({
    "string.base": "region should be a string",
    "string.empty": "region cannot be empty",
    "string.min": "region should have a minimum length of {#limit}",
    "string.max": "region should have a maximum length of {#limit}",
    "any.required": "region is required"
  }),

  description: Joi.string().min(3).max(500).required().messages({
    "string.base": "description should be a string",
    "string.empty": "description cannot be empty",
    "string.min": "description should have a minimum length of {#limit}",
    "string.max": "description should have a maximum length of {#limit}",
    "any.required": "description is required"
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
const validatePostAlert = validateSchema(alertSchema, true);
const validatePutAlert = validateSchema(alertSchema);

export { validatePostAlert, validatePutAlert };
