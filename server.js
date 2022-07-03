// Require dependencies
const express = require("express");
const mongoose = require("mongoose");

// Establish express functions and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Data handling and format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB/Mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Deep_Thought_DB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Log all executed collection methods and their arguments to the console.
mongoose.set("debug", true);

// Establish routes
app.use(require("./routes"));

// Deploy server and display address
app.listen(PORT, () =>
  console.log(`Server active at http://localhost:${PORT}/`)
);
