const Joi = require("@hapi/joi");

/**
 * Form Validations
 */
exports.validation = {
  signupValidation: (data) => {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).required(),
      gender: Joi.string().required(),
      profession: Joi.string().required(),
      birthday: Joi.required(),
      confirmed: Joi.bool().required(),
    };
    return Joi.validate(data, schema);
  },
  updateValidation: (data) => {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      gender: Joi.string().required(),
      profession: Joi.string().required(),
      birthday: Joi.required(),
    };
    return Joi.validate(data, schema);
  },
  loginValidation: (data) => {
    const schema = {
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).required(),
    };
    return Joi.validate(data, schema);
  },
  bookValidation: (data) => {
    const schema = {
      title: Joi.string().required(),
      author: Joi.string().required(),
      pages: Joi.number().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      isbn: Joi.string().required(),
      owner: Joi.number().required(),
    };
    return Joi.validate(data, schema);
  },
};
