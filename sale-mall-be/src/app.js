const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("../routers/auth");
const productRoute = require("../routers/product");

const app = express();
const PATH = "/api/v1";

app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoute);
app.use("/api/v1", productRoute);

const MONGODB_CLOUD =
  "mongodb+srv://hoangvananh291120:t63vNw6vo0978DHG@cluster0.vagd62i.mongodb.net/sale_mall?retryWrites=true&w=majority";

//connection database
mongoose
  .connect(MONGODB_CLOUD)
  .then(() => console.log("Kết nối DB thành công"))
  .catch((error) => console.log(error));

//connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running port", PORT);
});
