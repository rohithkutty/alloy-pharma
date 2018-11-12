const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

//Load Input validation
const validateMedicineInput = require("../../validation/addMedicine");

// Load Medicine model
const Medicine = require("../../models/Medicine");

// @route   GET api/medicines/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/medicines/addMedicine
// @desc    Create or Update medicines route
// @access  Private
router.post("/addMedicine", (req, res) => {
  const { errors, isValid } = validateMedicineInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const medicineFields = {
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    batchNo: req.body.batchNo,
    type: req.body.type,
    price: req.body.price,
    expDate: req.body.expDate
  };

  Medicine.findOne({ _id: req.body._id })
    .populate("name")
    .then(medicine => {
      if (medicine) {
        // Update
        Medicine.findOneAndUpdate(
          { _id: req.body._id },
          { $set: medicineFields },
          { new: true }
        ).then(medicine => res.json(medicine));
      } else {
        //Create

        //Check if the medicine name already exists
        Medicine.findOne({ name: req.body.name }).then(medi => {
          if (medi) {
            errors.name = "Medicine name already exists";
            return res.status(400).json(errors);
          } else {
            //Save Profile

            new Medicine(medicineFields)
              .save()
              .then(medicine => res.json(medicine));
          }
        });
      }
    });
});

// @route   GET api/medicines/all
// @desc    Get all medicines
// @access
router.get("/all", (req, res) => {
  const errors = {};

  Medicine.find()
    .populate()
    .then(medicines => {
      if (!medicines) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(medicines);
    })
    .catch(err => {
      res.status(404).json({
        medicines: "There are no profiles"
      });
    });
});

// @route   DELETE api/medicines/all
// @desc    Delete medicines
// @access
router.delete("/deleteMedicine", (req, res) => {
  Medicine.findOneAndRemove({ _id: req.body._id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
