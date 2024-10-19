"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Increase quantity
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-bold py-1 px-2 rounded">
          {product.discount}
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors duration-300">
        <AiOutlineHeart size={24} />
      </div>

      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.name}
        height={500}
        width={500}
        className="w-full h-32 object-contain my-4"
      />

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

      {/* Unit and Rating */}
      <div className="flex items-center text-gray-500 text-sm my-2">
        <span className="mr-4">1 UNIT</span>
        <span className="flex items-center">
          <AiFillStar className="text-yellow-400" /> {product.rating}
        </span>
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-gray-800">${product.price}</p>

      {/* Quantity Selector and Add to Cart */}
      <div className="flex items-center justify-between mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded">
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={decreaseQuantity}
          >
            <AiOutlineMinus />
          </button>
          <span className="px-4 py-1 text-gray-700">{quantity}</span>
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={increaseQuantity}
          >
            <AiOutlinePlus />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className="text-sm font-semibold text-indigo-600 hover:underline">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Default props for the ProductCard component
ProductCard.defaultProps = {
  product: {
    name: "Sunstar Fresh Melon Juice",
    image: "https://via.placeholder.com/100", // Replace with your image URL
    price: 18.0,
    rating: 4.5,
    discount: "-30%",
  },
};

export default ProductCard;
