const Product = require("../models/product");

const getListProduct = async (req, res) => {
  try {
    const productList = await Product.find().exec();

    res.json(productList);
  } catch (error) {
    console.log("Error Get List Products", error);
  }
};

const createProduct = async (req, res) => {
  const { name, image, price, desc } = req.body;
  const existUser = await Product.findOne({ name }).exec();
  if (existUser) {
    res.status(400).json({
      message: "product đã tồn tại",
    });
  }
  const product = await new Product({
    name,
    image,
    price,
    desc,
  }).save();
  res.status(201).json({
    user: {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      desc: product.desc,
    },
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const de = await Product.findByIdAndDelete(id);

    if (!de) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Delete successful",
    });
  } catch (error) {
    console.log("Error Delete Product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getListProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
