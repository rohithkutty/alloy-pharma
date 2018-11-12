const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

//API models
const medicines = require("./routes/api/medicines");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/medicines", medicines);

//Serving static files
// app.use(express.static(path.join(__dirname, "client/build")));

const port = process.env.PORT || 5006;

app.listen(port, () => console.log(`Server running on port ${port}`));
