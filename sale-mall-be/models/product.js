const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    desc: {
      type: String,
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

module.exports = model(DOCUMENT_NAME, ProductSchema);
