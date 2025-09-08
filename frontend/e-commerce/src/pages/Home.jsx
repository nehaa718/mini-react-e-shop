import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import API from "../api";
import "./Home.css";

const Home = ({ search, selectedCategory, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams();
        if (selectedCategory) query.append("category", selectedCategory);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);

        const { data } = await API.get(`/products?${query.toString()}`);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Carousel />
      <div className="home-container">
        <h2>Products</h2>

        <div className="price-filters">
          <div className="price-input">
            <label>Min Price</label>
            <input
              type="number"
              placeholder="₹0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="price-input">
            <label>Max Price</label>
            <input
              type="number"
              placeholder="₹9999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
