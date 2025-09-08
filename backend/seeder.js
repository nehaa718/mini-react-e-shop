const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();
connectDB();

const products = [
{
    name: "Red T-Shirt",
    category: "Men",
    price: 499,
    description: "Comfortable cotton T-shirt",
    image: "https://m.media-amazon.com/images/I/61S9azlDVuL._AC_UL320_.jpg",
  },
  {
    name: "Blue Kurti",
    category: "Women",
    price: 699,
    description: "Elegant women kurti",
    image: "https://m.media-amazon.com/images/I/8136v9EIK4L._AC_UL320_.jpg",
  },
  {
    name: "Kids Jeans",
    category: "Kids",
    price: 399,
    description: "Soft denim jeans for kids",
    image: "https://m.media-amazon.com/images/I/513KB-A-htL._AC_UL320_.jpg",
  },
  {
    name: "Men Hoodie",
    category: "Men",
    price: 999,
    description: "Warm hoodie for men",
    image: "https://m.media-amazon.com/images/I/51VmIOwoLDL._AC_UL320_.jpg",
  },
  {
    name: "Women Tops",
    category: "Women",
    price: 599,
    description: "Casual tops for women",
    image: "https://m.media-amazon.com/images/I/614POx6si7L._AC_UL320_.jpg",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); 
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
