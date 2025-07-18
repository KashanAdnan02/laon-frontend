import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {


  const navigate = useNavigate()
  const navigateToDetail = (id)=> {
    console.log('click', id)
    navigate(`/product/${id}`)
  }

  return (
    <div onClick={()=>navigateToDetail(product._id)} className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg hover:scale-[1.02] duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-3 text-lg font-bold text-black-600">${product.price}</div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
