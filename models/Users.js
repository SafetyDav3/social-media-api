// Pull mongoose dependencies and use our date formatter
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Develop a schema model for our application user
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/, // Regex for email validation. INFO: https://www.abstractapi.com/tools/email-regex-guide
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Get friend count and tie it to user as a virtual
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create user model from schema
const Users = model("Users", UserSchema);

// I better not see you around here again module!
module.exports = Users;
