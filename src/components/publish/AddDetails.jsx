import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../Cart/CartContext";

const AdDetail = () => {
  const { id } = useParams(); // Get the ad ID from the URL
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart(); // Get the addItemToCart function from context

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const adDoc = doc(db, "ads", id); // Replace 'ads' with your collection name
        const adSnapshot = await getDoc(adDoc);

        if (adSnapshot.exists()) {
          setAd(adSnapshot.data());
        } else {
          setError("Ad not found.");
        }
      } catch (error) {
        console.error("Error fetching ad:", error.message);
        setError("Error fetching ad.");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: ad.title,
      text: ad.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Ad shared successfully");
      } else {
        // Fallback for non-supported browsers (copy URL)
        navigator.clipboard.writeText(window.location.href);
        toast("URL copied to clipboard");
      }
    } catch (err) {
      console.error("Error sharing ad:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ad Image */}
        <div className="flex items-center justify-center relative">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            style={{ maxHeight: "800px" }} // Larger image height
          />

          {/* Edit Icon */}
          <Link
            to={`/editadd/${id}`} // Pass the ad ID to edit the specific ad
            className="absolute top-4 right-0 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            <FaEdit className="text-blue-600 text-3xl" />
          </Link>

          {/* Share Icon */}
          <button
            onClick={handleShare}
            className="absolute top-4 left-3 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            <FaShareAlt className="text-purple-600 text-3xl" />
          </button>
        </div>

        {/* Ad Details */}
        <div className="flex flex-col justify-center p-4 space-y-6">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{ad.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {ad.description}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Price: <span className="text-blue-600">${ad.price}</span>
          </p>
          <p className="text-lg text-gray-800">
            Category:{" "}
            <span className="font-medium text-blue-600">{ad.category}</span>
          </p>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() =>
              addItemToCart({
                id,
                price: ad.price,
                title: ad.title,
                imageUrl: ad.imageUrl,
              })
            }>
            Add to Cart
          </button>

          {/* Message the Publisher Button */}
          <button className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-4 px-8 rounded-lg text-xl font-semibold hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
            Message the Publisher
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;
