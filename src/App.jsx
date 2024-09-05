import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Footer from "./components/Footer/Footer";
import CreateAdd from "./components/publish/CreateAdd";
import AdDetail from "./components/publish/AddDetails";
import EditAdd from "./components/publish/EditAdd";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for Toastify
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/createadd" element={<CreateAdd />} />
            <Route path="/editadd" element={<EditAdd />} />
            <Route path="/ad/:id" element={<AdDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce} // Corrected syntax here
        />
      </Router>
    </CartProvider>
  );
}

export default App;
