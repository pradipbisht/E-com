import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../services/Firebase";
import Card from "../Product/Card";
import { useCart } from "../components/Cart/CartContext";

const Product = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItemToCart } = useCart();

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "ads"),
          orderBy("createdAt", "desc") // Order by createdAt in descending order
        );
        const querySnapshot = await getDocs(q);
        const adsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data.");
        toast.error("Failed to fetch ads.");
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ads.map((ad) => (
          <Card
            key={ad.id}
            category={ad.category}
            imageUrl={ad.imageUrl}
            price={ad.price}
            title={ad.title}
            onEdit={() => console.log(`Edit ${ad.id}`)} // Replace with your edit logic
            onAddToCart={() => addItemToCart({ id: ad.id, ...ad })}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
