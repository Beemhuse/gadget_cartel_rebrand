// src/components/ProductDetail.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import useCartStore from "@/components/store/cartStore";
import { toast } from "react-hot-toast";
// import { toast } from 'react-toastify';

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1); // State to handle local quantity
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const addToCart = useCartStore((state) => state.addToCart); // Zustand function to add to cart
  const incrementQuantity = useCartStore((state) => state.incrementQuantity); // Zustand function to increment quantity
  const decrementQuantity = useCartStore((state) => state.decrementQuantity); // Zustand function to decrement quantity
  const cart = useCartStore((state) => state.cart); // Zustand to get the cart

  const isProductInCart = cart.find((item) => item.id === product.id); // Check if the product is in the cart

  const handleAddToCart = () => {
    try {
      if (!isProductInCart) {
        addToCart(product); // Add product to cart using Zustand
        toast.success("Product added to cart!");
      }
    } catch (error) {
      // console.error(error);
      toast.error(error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <section className="section py-10" id="product">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Images */}
          <div className="left-images space-y-4">
            <Image
              src={selectedImage}
              alt={product.title}
              width={500}
              height={500}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Right Content */}
          <div className="right-content space-y-4">
            <h4 className="text-3xl font-semibold">{product.title}</h4>
            <span className="price text-xl font-bold text-gray-700">
              {product.price}
            </span>

            {/* Star Ratings */}
            <ul className="flex space-x-1 text-yellow-500">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <li key={i}>
                    <i className="fa fa-star"></i>
                  </li>
                ))}
            </ul>

            <p className="text-gray-600">{product.description}</p>

            <div className="quote p-4 bg-gray-100 rounded-lg border-l-4 border-blue-500">
              <i className="fa fa-quote-left text-blue-500"></i>
              <p className="ml-2 text-gray-700">{product.quote}</p>
            </div>

            {/* Smaller Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className={`w-20 h-20 cursor-pointer rounded-md border ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>

            {/* Quantity Selector */}
            {isProductInCart ? (
              <div className="quantity-content flex justify-between items-center">
                <h6 className="font-medium">No. of Orders</h6>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementQuantity(product.id)}
                    className="minus bg-gray-200 p-2 rounded-md"
                  >
                    -
                  </button>
                  <span className="input-text w-12 text-center border border-gray-300 rounded-md">
                    {isProductInCart.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(product.id)}
                    className="plus bg-gray-200 p-2 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="main-border-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add To Cart
              </button>
            )}

            {/* Total Price */}
            <div className="total mt-4">
              <h4 className="text-2xl font-semibold">
                Total: $
                {product.price *
                  (isProductInCart ? isProductInCart.quantity : quantity)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
