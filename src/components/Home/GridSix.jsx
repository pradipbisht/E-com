import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { db } from "../../services/Firebase";
import { toast } from "react-toastify";

const GridSix = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "ads"),
          orderBy("createdAt", "asc"), // Order by createdAt in descending order
          limit(5) // Fetch 5 ads to exclude the oldest one
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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (ads.length === 0) {
    return <p className="text-center text-gray-500">No ads available.</p>;
  }

  // Exclude the oldest image and only show 4 images
  const imagesToDisplay = ads.slice(1, 5);

  return (
    <div className="mt-4">
      {/* 4x1 Grid excluding the oldest image */}
      <div className="grid grid-cols-4 gap-4">
        {imagesToDisplay.map((ad) => (
          <a
            key={ad.id}
            href={`/ad/${ad.id}`}
            className="block border rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-60 object-cover" // Adjust height as needed
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GridSix;
