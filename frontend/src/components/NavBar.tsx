import "../styles/Navbar.css";
import UserProfile from "../components/UserProfile";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  toggleSidebar: () => void;
  user: {
    name?: string;
    email?: string;
  };
  cartCount?: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Navbar({ toggleSidebar, user, cartCount = 0, searchQuery, onSearchChange }: Props) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="hamburger" onClick={toggleSidebar}>
          ☰
        </div>
        <div className="brand">📚 BookMart</div>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="navbar-right">
        <Link to="/cart" className="cart-container">
          <FaShoppingCart size={22} className="cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <div className="welcome-msg">Hi, {user.name || "User"}</div>

        <UserProfile name={user.name || "User"} email={user.email || ""} />
      </div>
    </nav>
  );
}
