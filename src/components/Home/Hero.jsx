import React from "react";
import { Link } from "react-router-dom"; // Make sure to have react-router-dom installed
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../services/Firebase"; // Adjust the import path as needed

const Hero = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the oldest document based on timestamp
        const q = query(collection(db, "ads"), orderBy("createdAt"), limit(1));
        const querySnapshot = await getDocs(q);
        const ads = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(ads);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col h-[70vh] mt- sm:flex-row border bg-white overflow-hidden rounded-lg shadow-lg">
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-4 sm:px-8">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base uppercase">
              Discover Hidden Gems
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Second-Hand Finds
          </h1>
          <div className="flex items-center gap-2">
            <Link
              to="/product" // Link to your products page
              className="font-semibold text-sm md:text-base uppercase bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Shop Now
            </Link>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right */}
      <div className="w-full sm:w-1/2 relative flex items-center justify-center overflow-hidden">
        {data.length > 0 ? (
          data.map((ad) => (
            <Link
              to={`/ad/${ad.id}`} // Link to the details page of the ad
              key={ad.id}
              className="relative w-full h-full flex items-center justify-center">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/50 rounded-lg pointer-events-none"></div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
