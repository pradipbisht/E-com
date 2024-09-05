import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase";
import UseAuthStatus from "../../hooks/UseAuthStatus";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const Navbar = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to home or login page after sign-out
      navigate("/");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  // Determine if the current page is "/createadd"
  const isCreateAddPage = location.pathname === "/createadd";

  return (
    <nav className="bg-white text-black shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold tracking-tight">Style_hive</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
            Home
          </Link>
          <Link
            to="/product"
            className="text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
            Products
          </Link>
          {!isCreateAddPage && loggedIn && (
            <Link
              to="/createadd"
              className="text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
              Create Ad
            </Link>
          )}
          {!checkingStatus ? (
            loggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-700">
                  Sign-Out
                </button>
                <Link
                  to="/cart"
                  className="flex items-center text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
                  <FaShoppingCart className="mr-2 text-xl" /> Cart
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg font-semibold transition-colors duration-300 hover:text-yellow-300">
                  Signup
                </Link>
              </>
            )
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
