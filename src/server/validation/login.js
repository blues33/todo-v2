const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginInput(data) {
  const errors = {};

  if (_.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (_.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
