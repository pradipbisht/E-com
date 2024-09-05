import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "./CartContext"; // Import CartContext
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeItemFromCart, updateQuantity } = useCart(); // Use correct function name

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    toast.success("Checkout completed!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}>
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              {/* Remove Item */}
              <button
                className="ml-4 p-2 text-red-500"
                onClick={() => removeItemFromCart(item.id)}>
                {" "}
                {/* Fixed function name */}
                <FaTrashAlt size={18} />
              </button>
            </div>
          ))}

          {/* Total Price and Checkout */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
