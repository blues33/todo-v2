const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  if (_.isEmpty(data.name) || _.isUndefined(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(data.name, { min: 4, max: 20 })) {
    errors.name = 'Name must be between 4 and 20 characters';
  }

  if (_.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (_.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (_.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
