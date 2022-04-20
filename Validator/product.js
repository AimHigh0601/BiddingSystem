const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  if(validator.isEmpty(data.title)) {
    errors.title = "Title can not be left blank";
  }

  if(validator.isEmpty(data.description)) {
    errors.description = "Bid Content is required";
  }

  if(validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  }

  if(validator.isEmpty(data.to)) {
    errors.to = "Bid End Time is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}