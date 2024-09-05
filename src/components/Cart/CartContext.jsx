import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addItemToCart = (item) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      saveCart(updatedItems);
      toast.success("Item quantity updated!");
    } else {
      saveCart([...cartItems, { ...item, quantity: 1 }]);
      toast.success("Item added to cart!");
    }
  };

  const removeItemFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    saveCart(updatedItems);
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    saveCart([]);
    toast.info("Cart cleared");
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
