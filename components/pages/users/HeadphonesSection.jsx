"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/card/ProductCard";
import useCartStore from "@/components/store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export default function HeadphonesSection() {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart); // Assuming you have a custom hook for your cart store
  const router = useRouter()
  const handleAddToCart = (product) => {
    try {
      addToCart(product, 1); // Add to cart with a quantity of 1
    } catch (error) {
      toast.error("Item already exists in the cart");
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  // Handle View Details action
  const handleViewDetails = (slug) => {
    router.push(`/product/${slug}`)
  };
  return (
    <section
      className="section xl:w-[70%] w-full mx-auto py-10"
      id="headphones"
    >
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
            gap: "1rem",
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
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
