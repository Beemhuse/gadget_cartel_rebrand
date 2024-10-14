"use client"
import React, { useRef } from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import icons for scroll buttons

// Category Data (can be replaced with dynamic data)
const categories = [
  { name: "Fruits & Veges", icon: "🥦" },
  { name: "Fruits & Veges", icon: "🥕" },
  { name: "Fruits & Veges", icon: "🍎" },
  { name: "Fruits & Veges", icon: "🥑" },
  { name: "Fruits & Veges", icon: "🍍" },
  { name: "Fruits & Veges", icon: "🍌" },
];

const CategorySection = () => {
  // Create a reference for horizontal scrolling
  const scrollRef = useRef();

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150; // Adjust scroll amount as needed
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150; // Adjust scroll amount as needed
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Category</h2>
        <button className="text-gray-600 hover:text-gray-800 transition duration-300">
          View All Categories →
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white p-2 rounded-full shadow-md"
          onClick={scrollLeft}
        >
          <AiOutlineLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white p-2 rounded-full shadow-md"
          onClick={scrollRight}
        >
          <AiOutlineRight />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 no-scrollbar py-4"
          style={{ scrollBehavior: "smooth" }} 
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className=" h-40 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center text-center p-4"
            >
              {/* Replace emoji with icons or images as needed */}
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="text-lg font-semibold text-gray-800">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
