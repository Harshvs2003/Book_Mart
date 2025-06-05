import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import UserProfile from "../components/UserProfile";
import CategoryMenu from "../components/CategoryMenu";
import BookList from "../components/BookList";
import bookData from "../data/book.json";

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

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(bookData);
  const [showSidebar, setShowSidebar] = useState(false);

  // Change cart state type to CartItem[]
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = ["All", ...Array.from(new Set(bookData.map((b) => b.category)))];

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBooks(bookData);
    } else {
      setFilteredBooks(bookData.filter((book) => book.category === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!user.name) navigate("/");
  }, [user, navigate]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleAddToCart = (book: Book) => {
    // Make a copy of current cart
    const updatedCart = [...cart];
    const foundIndex = updatedCart.findIndex((item) => item.id === book.id);

    if (foundIndex !== -1) {
      // Increment quantity if book already in cart
      updatedCart[foundIndex].quantity += 1;
    } else {
      // Add new book with quantity 1
      updatedCart.push({ ...book, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Optionally: alert(`Added "${book.name}" to cart`);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} user={user} cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <div style={{ display: "flex" }}>
        {showSidebar && (
          <CategoryMenu categories={categories} onSelectCategory={setSelectedCategory} />
        )}

        {selectedCategory && (
          <BookList books={filteredBooks} onAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
  );
}
