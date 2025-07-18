import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Product = () => {
  const Base_url = import.meta.env.VITE_BASE_URL;
  const local_Url = import.meta.env.VITE_LOCAL_URL;

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  const [productData, setProductData] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const imagehandle = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageData = new FormData();
      imageData.append('image', imageFile);

      const uploadRes = await axios.post(`${Base_url}upload/`, imageData);
      const imageUrl = uploadRes.data.imageUrl;

      const response = await axios.post(`${Base_url}product`, {
        ...formData,
        imageUrl
      });

      setProductData(prev => [...prev, response.data.product]);

      console.log(response.data);
    } catch (err) {
      console.error('Error uploading or submitting product:', err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${local_Url}product`);
      setProductData(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* Form */}
      <div className="mt-10 w-full flex justify-center">
        <form className="w-full max-w-md bg-white shadow p-6 rounded" onSubmit={handleSubmit}>
          <input
            name="name"
            onChange={handleChange}
            className="h-10 rounded p-2 border border-gray-300 mb-4 w-full"
            placeholder="Enter name"
            type="text"
          />
          <input
            name="price"
            onChange={handleChange}
            className="h-10 rounded p-2 border border-gray-300 mb-4 w-full"
            placeholder="Enter price"
            type="text"
          />
          <input
            name="description"
            onChange={handleChange}
            className="h-10 rounded p-2 border border-gray-300 mb-4 w-full"
            placeholder="Enter description"
            type="text"
          />
          <input
            onChange={imagehandle}
            className="h-12 rounded p-2 border border-gray-300 mb-4 w-full"
            type="file"
            accept="image/*"
          />
          <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>

      {/* Grid of Product Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData &&
          productData.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default Product;
