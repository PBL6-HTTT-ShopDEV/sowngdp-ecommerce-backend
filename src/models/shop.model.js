"use strict"; // eslint-disable-line
// key: !dmbg insert the following line after the "use strict" statement

const { model, Schema, Types, Collection } = require("mongoose");

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    role: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, Collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
