const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMedicineInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer : "";
  data.batchNo = !isEmpty(data.batchNo) ? data.batchNo : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.expDate = !isEmpty(data.expDate) ? data.expDate : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.manufacturer, { min: 2, max: 30 })) {
    errors.manufacturer =
      "Manufacturer name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = "Manufacturer name is required";
  }

  if (!Validator.isLength(data.batchNo, { min: 6, max: 30 })) {
    errors.batchNo = "Batch no must be at least 6 characters";
  }

  if (Validator.isEmpty(data.batchNo)) {
    errors.batchNo = "Batch number is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price value field is required";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "Medicine type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
