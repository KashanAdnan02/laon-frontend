import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  const local_Url = import.meta.env.VITE_LOCAL_URL;

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${local_Url}product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Populate form with current product
  const openModal = () => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${local_Url}product/${id}`, formData);
      setProduct(res.data); // update product in state
      closeModal();
      alert("Product updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${local_Url}product/${id}`);
      alert('Product deleted');
      // You can redirect here if needed
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-[10%] p-6 bg-white shadow-md rounded-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-indigo-600 text-xl font-semibold mt-4">${product.price}</p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={openModal}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-200"
        >
          Delete
        </button>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              placeholder="Product Name"
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              placeholder="Price"
              type="number"
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              placeholder="Description"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
