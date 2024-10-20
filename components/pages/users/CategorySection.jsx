"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router hook

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import icons for scroll buttons
import { FaMobileAlt, FaLaptop, FaClock, FaTabletAlt, FaCamera } from 'react-icons/fa'; // Icons for categories
import { client } from '@/sanity/lib/client';

const defaultIcons = {
  phone: <FaMobileAlt />,
  laptop: <FaLaptop />,
  watch: <FaClock />,
  tablet: <FaTabletAlt />,
  camera: <FaCamera />,
  default: '📦', // Fallback icon if category isn't matched
};

const CategorySection = () => {
  // Create a reference for horizontal scrolling
  const scrollRef = useRef();
const router = useRouter()
  // State to hold fetched categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "category"]{
            title,
            slug
          }
        `);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150; // Adjust scroll amount as needed
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150; // Adjust scroll amount as needed
  };

  // Function to handle category click and navigate to dynamic route
  const handleCategoryClick = (slug) => {
    router.push(`/category/${slug}`);
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
          {categories?.length > 0 ? (
            categories.map((category, index) => {
              const icon = defaultIcons[category.slug.current] || defaultIcons.default;

              return (
                <div
                  key={index}
                  className="h-40 w-40 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center text-center p-4"
                  onClick={() => handleCategoryClick(category.slug.current)} // Handle category click

                >
                  <div className="text-4xl mb-2">{icon}</div>
                  <p className="text-lg font-semibold text-gray-800">
                    {category?.title}
                  </p>
                </div>
              );
            })
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
