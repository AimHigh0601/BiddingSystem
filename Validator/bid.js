const validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.bid = !isEmpty(data.bid) ? data.bid : '';

  if(validator.isEmpty(data.bid)) {
    errors.bid = "Bid Price is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
