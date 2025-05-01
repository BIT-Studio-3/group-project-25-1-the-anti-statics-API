import Joi from "joi";

// Define the Damage schema based on the model structure
const resourcesAvailabilitySchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  
  contactInfo: Joi.string().min(3).max(100).required().messages({
    "string.base": "contactInfo should be a string",
    "string.empty": "contactInfo cannot be empty",
    "string.min": "contactInfo should have a minimum length of {#limit}",
    "string.max": "contactInfo should have a maximum length of {#limit}",
    "any.required": "contactInfo is required"
  }),


  assistance: Joi.string().min(3).max(100).required().messages({
    "string.base": "assistance should be a string",
    "string.empty": "assistance cannot be empty",
    "string.min": "assistance should have a minimum length of {#limit}",
    "string.max": "assistance should have a maximum length of {#limit}",
    "any.required": "assistance is required"
  }),
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
const validatePostResources = validateSchema(resourcesAvailabilitySchema, true);
const validatePutResources = validateSchema(resourcesAvailabilitySchema);

export { validatePostResources, validatePutResources };
