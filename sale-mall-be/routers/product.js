const Router = require("express");
const {
  getListProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/product/list", getListProduct);
router.post("/product/create", createProduct);
router.patch("/product/update/:id", updateProduct);
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
