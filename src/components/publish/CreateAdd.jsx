import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/Firebase";

const CreateAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
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

      await addDoc(collection(db, "ads"), {
        title,
        description,
        price,
        category,
        imageUrl,
        createdAt: Timestamp.now(), // Add timestamp field here
      });

      alert("Advertisement created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error creating advertisement: ", error);
      alert("Failed to create advertisement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Create Advertisement</h2>
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
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdd;
