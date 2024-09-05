import React from "react";
import { FaEdit } from "react-icons/fa";

const Card = ({ category, imageUrl, price, title, onEdit, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white p-2 rounded-full flex items-center">
          <FaEdit size={20} />
        </button>
      </div>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button
            onClick={onAddToCart}
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
