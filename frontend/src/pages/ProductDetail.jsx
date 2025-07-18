import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const local_Url = import.meta.env.VITE_LOCAL_URL;

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

  if (!product) {
    return <div className="text-center mt-20">Loading...</div>;
  }

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
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow transition duration-200">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
