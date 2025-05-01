import Joi from "joi";

// Define the Damage schema based on the model structure
const hazardSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  
  type: Joi.string().min(3).max(100).required().messages({
    "string.base": "type should be a string",
    "string.empty": "type cannot be empty",
    "string.min": "type should have a minimum length of {#limit}",
    "string.max": "type should have a maximum length of {#limit}",
    "any.required": "type is required"
  }),

  level: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "level should be a number",
    "number.min": "level should be between 1 and 5",
    "number.max": "level should be between 1 and 5",
    "any.required": "level is required"
  }),

  city: Joi.string().min(3).max(100).required().messages({
    "string.base": "city should be a string",
    "string.empty": "city cannot be empty",
    "string.min": "city should have a minimum length of {#limit}",
    "string.max": "city should have a maximum length of {#limit}",
    "any.required": "city is required"
  }),

  location: Joi.string().min(3).max(100).required().messages({
    "string.base": "location should be a string",
    "string.empty": "location cannot be empty",
    "string.min": "location should have a minimum length of {#limit}",
    "string.max": "location should have a maximum length of {#limit}",
    "any.required": "location is required"
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
const validatePostHazard = validateSchema(hazardSchema, true);
const validatePutHazard = validateSchema(hazardSchema);

export { validatePostHazard, validatePutHazard };
