const Joi = require('joi');

const productValidation = (req, res, next) => {
  const validation = JOI.object({
    name: Joi.string()
    .min(5),
  });

next();
};

module.export = productValidation;