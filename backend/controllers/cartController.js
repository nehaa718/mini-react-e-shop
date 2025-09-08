const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
      cart = await cart.populate("items.product");
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add or update item in cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const quantity = Number(qty);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    if (isNaN(quantity) || quantity === 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, qty: Math.max(quantity, 1) }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (i) => i.product && i.product.toString() === productId
      );

      if (itemIndex > -1) {
        
        cart.items[itemIndex].qty += quantity;
        if (cart.items[itemIndex].qty <= 0) cart.items.splice(itemIndex, 1);
      } else if (quantity > 0) {
        
        cart.items.push({ product: productId, qty: quantity });
      }
    }

    await cart.save();
    await cart.populate("items.product");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Add/Update Cart Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    
    cart.items = cart.items.filter(
      (i) => i.product && i.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product"); 
    res.status(200).json(cart);
  } catch (error) {
    console.error("Remove Cart Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
