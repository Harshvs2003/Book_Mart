import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import SellerHome from "./pages/SellerHome";
import Cart from "./components/Cart";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sellerhome" element={<SellerHome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}


export default App;
