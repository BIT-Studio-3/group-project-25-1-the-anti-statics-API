import Joi from "joi";

// Define the Damage schema based on the model structure
const damageSchema = Joi.object({
    reporterName: Joi.string().min(3).max(50).required().messages({
    "string.base": "reporter name should be a string",
    "string.empty": "reporter name cannot be empty",
    "string.min": "reporter name should have a minimum length of {#limit}",
    "string.max": "reporter name should have a maximum length of {#limit}",
    "any.required": "reporter name is required"
  }),
  
  damageType: Joi.string().min(3).max(100).required().messages({
    "string.base": "damageType should be a string",
    "string.empty": "damageType cannot be empty",
    "string.min": "damageType should have a minimum length of {#limit}",
    "string.max": "damageType should have a maximum length of {#limit}",
    "any.required": "damageType is required"
  }),

  damageLevel: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "damageLevel should be a number",
    "number.min": "damageLevel should be between 1 and 5",
    "number.max": "damageLevel should be between 1 and 5",
    "any.required": "damageLevel is required"
  }),

  location: Joi.string().min(3).max(100).required().messages({
    "string.base": "location should be a string",
    "string.empty": "location cannot be empty",
    "string.min": "location should have a minimum length of {#limit}",
    "string.max": "location should have a maximum length of {#limit}",
    "any.required": "location is required"
  }),

  countAffected: Joi.number().integer().min(1).max(100).required().messages({
    "number.base": "countAffected should be a number",
    "number.min": "countAffected should be between 1 and 100",
    "number.max": "countAffected should be between 1 and 100",
    "any.required": "countAffected is required"
  }),

  cause: Joi.string().min(3).max(500).required().messages({
    "string.base": "cause should be a string",
    "string.empty": "cause cannot be empty",
    "string.min": "cause should have a minimum length of {#limit}",
    "string.max": "cause should have a maximum length of {#limit}",
    "any.required": "cause is required"
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
const validatePostDamage = validateSchema(damageSchema, true);
const validatePutDamage = validateSchema(damageSchema);

export { validatePostDamage, validatePutDamage };
