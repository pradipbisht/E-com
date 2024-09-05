import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      toast.success("Subscribed successfully!");
      setEmail(""); // Clear the input field
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <>
      <footer className="bg-white text-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left Section - Contact Info */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaPhoneAlt className="mr-2" /> +91-9876543210
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2" /> secondhandshop@example.com
            </p>
          </div>

          {/* Center Section - Social Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-500 transition">
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-500 transition">
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Right Section - Subscribe */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-2">
              Subscribe to Our Newsletter
            </h4>
            <form
              className="flex flex-col md:flex-row items-center"
              onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="py-2 px-4 border border-gray-300 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
              />
              <button
                type="submit"
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8 text-gray-600">
          <p>© 2024 SecondHandShop. All rights reserved.</p>
          <p className="mt-2">
            <a
              href="https://your-portfolio.vercel.app" // Replace with your Vercel portfolio link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.844 0-10.5-4.656-10.5-10.5S6.156 1.5 12 1.5 22.5 6.156 22.5 12 17.844 22.5 12 22.5zm-1.5-15h-3v9h3v-9zm3 0h-3v9h3v-9zm0-3h-3v1.5h3V4.5z"
                  fill="currentColor"
                />
              </svg>
              <span>Visit My Portfolio</span>
            </a>
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Footer;
