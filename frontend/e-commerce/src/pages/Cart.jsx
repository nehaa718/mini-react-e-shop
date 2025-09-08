import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, updateCartItem, removeCartItem }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.qty * (item.product?.price || 0)),
    0
  );

  const handleDecrement = (item) => {
    if (!item.product?._id) return;
    updateCartItem(item.product._id, -1);
  };

  const handleIncrement = (item) => {
    if (!item.product?._id) return;
    updateCartItem(item.product._id, 1);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={item.product?._id || index}>
                <img
                  src={item.product?.image || "https://via.placeholder.com/100"}
                  alt={item.product?.name || "Product"}
                />
                <div className="item-details">
                  <h4>{item.product?.name || "Unnamed Product"}</h4>
                  <p>Price: ₹{item.product?.price || 0}</p>
                  <div className="qty-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeCartItem(item.product?._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
