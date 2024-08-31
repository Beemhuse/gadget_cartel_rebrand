"use client";
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Image from 'next/image';
import { FaRegStar, FaRegEye, FaOpencart } from 'react-icons/fa';
// import { client } from '@/utils/sanity/client';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

// Fetch products on the client side
const fetchProducts = async () => {
  const query = `*[_type == "product" ]{
    _id,
    title,
    slug,
    price,
    images[]{asset->{url}},
    reviews[]->{rating, comment}
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export default function HeadphonesSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);
console.log(products)
  return (
    <section className="section xl:w-[70%] w-full mx-auto py-10" id="headphones">
      <div className="mx-auto px-4">
        <div className="text-left mb-6">
          <h2 className="text-3xl font-bold">Headphones Latest</h2>
          <span className="text-gray-600">
            Details to details is what makes our products different from others.
          </span>
        </div>

        <Splide
          options={{
            perPage: 3,
            gap: '1rem',
            breakpoints: {
              1024: { perPage: 2 },
              768: { perPage: 1 },
            },
            arrows: true,
            pagination: true,
            autoplay: true,
          }}
          className="carousel"
        >
          {products.map((product) => (
            <SplideSlide key={product._id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden relative group">
                {/* Product Image with Overlay */}
                <div className="relative">
                  <Image
                    src={product.images[0]?.asset.url}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                  {/* Hover Content */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mb-4">
                      <button className="text-black bg-white p-4 text-xl">
                        <FaRegStar />
                      </button>
                      <button
                        onClick={() => window.location.href = `/product/${product.slug.current}`}
                        className="text-black bg-white p-4 text-xl"
                      >
                        <FaRegEye />
                      </button>
                      <button className="text-black bg-white p-4 text-xl">
                        <FaOpencart />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
                  <span className="text-gray-500">{product.price}</span>
                  {/* Review Stars */}
                  <ul className="flex justify-center mt-2 space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <FaRegStar />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
