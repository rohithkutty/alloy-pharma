const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Medicine model
const Medicine = require("../../models/Medicine");

// @route   GET api/medicines/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
