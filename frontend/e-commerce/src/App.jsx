import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import API from "./api";



function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  
  const refreshCart = async () => {
    if (!user) return;
    try {
      const { data } = await API.get("/cart");
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Fetch Cart Error:", err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return alert("Please login to add to cart");
    try {
      await API.post("/cart/add", { productId: product._id, qty: 1 });
      await refreshCart(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const removeCartItem = async (productId) => {
    if (!productId) return alert("Invalid product ID");
    try {
      await API.post("/cart/remove", { productId });
      await refreshCart(); 
    } catch (err) {
      console.error("Remove Cart Error:", err);
      alert(err.response?.data?.message || "Failed to remove from cart");
    }
  };

  const updateCartItem = async (productId, delta) => {
    const item = cartItems.find((i) => i.product?._id === productId);
    if (!item) return;

    const newQty = item.qty + delta;
    if (newQty <= 0) {
      return removeCartItem(productId);
    }

    try {
      await API.post("/cart/update", { productId, qty: newQty });
      await refreshCart(); 
    } catch (err) {
      console.error("Update Cart Error:", err);
      alert(err.response?.data?.message || "Failed to update cart");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartItems([]);
  };

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        cartItems={cartItems}
        user={user}
        handleLogout={handleLogout}
      />
      <Navbar setSelectedCategory={setSelectedCategory} />
      <Routes>
        <Route
          path="/home"
          element={
            user ? (
              <Home
                search={search}
                selectedCategory={selectedCategory}
                addToCart={addToCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            user ? (
              <Cart
                cartItems={cartItems}
                removeCartItem={removeCartItem}
                updateCartItem={updateCartItem}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
