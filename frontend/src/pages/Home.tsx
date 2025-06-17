import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(bookData);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = ["All", ...Array.from(new Set(bookData.map((b) => b.category)))];

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (!user.name) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    // Filter books by category and search query
    let books = bookData;

    if (selectedCategory !== "All") {
      books = books.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      books = books.filter(
        (book) =>
          book.name.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.category.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredBooks(books);
  }, [selectedCategory, searchQuery]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleAddToCart = (book: Book) => {
    const updatedCart = [...cart];
    const foundIndex = updatedCart.findIndex((item) => item.id === book.id);

    if (foundIndex !== -1) {
      updatedCart[foundIndex].quantity += 1;
    } else {
      updatedCart.push({ ...book, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Navbar
        toggleSidebar={toggleSidebar}
        user={user}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div style={{ display: "flex" }}>
        {showSidebar && <CategoryMenu categories={categories} onSelectCategory={setSelectedCategory} />}

        <BookList books={filteredBooks} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
