const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema(
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
      required: true,
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

userSchema.methods.authenticate = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model(DOCUMENT_NAME, userSchema);
