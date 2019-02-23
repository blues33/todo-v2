const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateTodoInput(data) {
  const errors = {};

  if (_.isEmpty(data.task) || _.isUndefined(data.task)) {
    errors.task = 'Task field is required';
  }

  if (!Validator.isLength(data.task, { min: 2, max: 20 })) {
    errors.task = 'Task must be between 2 and 20 characters';
  }

  if (_.isEmpty(data.priority)) {
    errors.priority = 'Choose priority';
  }

  if (_.isEmpty(data.get_done_by)) {
    errors.get_done_by = 'get done by field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
