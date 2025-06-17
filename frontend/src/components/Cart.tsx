import { useEffect, useState } from "react";
import "../styles/Cart.css";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
}

interface CartItem extends Book {
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decrementQuantity = (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    updateCart(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>{item.author}</p>
                <p className="category">{item.category}</p>

                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
