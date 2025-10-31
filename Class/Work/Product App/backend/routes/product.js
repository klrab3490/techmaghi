const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { auth, authorize, authorizeOwnerOrAdmin } = require("../middleware/auth");

/**
 * @route   GET /products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy", "username email role")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

/**
 * @route   GET /products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("createdBy", "username email role");

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

/**
 * @route   POST /products
 * @desc    Create a new product (Admin only)
 * @access  Admin
 */
router.post("/", auth, authorize("admin"), async (req, res) => {
  try {
    const { title, description, price, quantity, category, images } = req.body;

    if (!title || !description || !price || !quantity) {
      return res.status(400).json({ error: "Title, description, price, and quantity are required." });
    }

    const product = new Product({
      title,
      description,
      price,
      quantity,
      category,
      images,
      createdBy: req.user.id,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
});

/**
 * @route   PUT /products/:id
 * @desc    Update product (only owner or admin)
 * @access  Owner/Admin
 */
router.put(
  "/:id",
  auth,
  authorizeOwnerOrAdmin(async (req) => {
    const product = await Product.findById(req.params.id);
    return product?.createdBy;
  }),
  async (req, res) => {
    try {
      const { title, description, price, quantity, category, images } = req.body;

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        { title, description, price, quantity, category, images, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Product not found." });
      }

      res.status(200).json({
        message: "Product updated successfully.",
        product: updated,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product." });
    }
  }
);

/**
 * @route   DELETE /products/:id
 * @desc    Delete product (only owner or admin)
 * @access  Owner/Admin
 */
router.delete(
  "/:id",
  auth,
  authorizeOwnerOrAdmin(async (req) => {
    const product = await Product.findById(req.params.id);
    return product?.createdBy;
  }),
  async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Product not found." });
      }

      res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product." });
    }
  }
);

module.exports = router;
