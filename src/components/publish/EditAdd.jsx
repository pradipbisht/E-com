import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/Firebase";
import { useParams } from "react-router-dom";

const EditAdd = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(""); // To store the existing image URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdDetails = async () => {
      const adDoc = doc(db, "ads", id);
      const adSnapshot = await getDoc(adDoc);
      if (adSnapshot.exists()) {
        const adData = adSnapshot.data();
        setTitle(adData.title);
        setDescription(adData.description);
        setPrice(adData.price);
        setCategory(adData.category);
        setExistingImage(adData.imageUrl);
      }
    };
    fetchAdDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = existingImage; // Default to existing image

      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                imageUrl = url;
                resolve();
              });
            }
          );
        });
      }

      const adDoc = doc(db, "ads", id);
      await updateDoc(adDoc, {
        title,
        description,
        price,
        category,
        imageUrl,
      });

      alert("Advertisement updated successfully!");
    } catch (error) {
      console.error("Error updating advertisement: ", error);
      alert("Failed to update advertisement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-2xl font-bold mb-4">Edit Advertisement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700">
            Price:
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}>
            <option value="">Select a category</option>
            <option value="gaming_console">Gaming Console</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="headphones">Headphones</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700">
            Image:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading}
          />
          {existingImage && (
            <div className="mt-2">
              <img
                src={existingImage}
                alt="Existing"
                className="w-full h-auto object-cover rounded-lg"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}>
          {loading ? "Submitting..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditAdd;
