const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MedicineSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  batchNo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String
  },
  expDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Medicine = mongoose.model("medicines", MedicineSchema);
