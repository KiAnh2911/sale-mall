const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      res.status(400).json({
        message: "Email đã tồn tại",
      });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password || "", salt);
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    const isPasswordCorrect = await user.authenticate(password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        message: "Sai mật khẩu",
      });
    } else {
      const token = jwt.sign({ _id: user._id }, "123456");
      res.json({
        message: "Đăng nhập thành công",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error login", error);
  }
};

module.exports = { login, register };
