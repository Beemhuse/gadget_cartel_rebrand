// src/components/HeroBanner.js
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function HeroBanner() {
  const bannerRefs = useRef([]);
  const leftBannerRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "category"]{
            title,
            description,
            slug,
                        image // Fetch the image

          }
        `);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    // Animation for both sections coming from left and right simultaneously
    anime({
      targets: leftBannerRef.current,
      translateX: [-100, 0], // Animate from left to center
      easing: "easeOutExpo",
      duration: 1000,
      opacity: [0, 1],
    });

    anime({
      targets: bannerRefs.current,
      translateX: [100, 0], // Animate from right to center
      easing: "easeOutExpo",
      duration: 1000,
      delay: anime.stagger(100), // Stagger the animation for the right content
      opacity: [0, 1],
    });

    // Hover animation for right content using Anime.js
    bannerRefs.current.forEach((ref) => {
      ref.addEventListener("mouseenter", () => {
        anime({
          targets: ref.querySelector(".hover-content"),
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutExpo",
          duration: 500,
        });
      });

      ref.addEventListener("mouseleave", () => {
        anime({
          targets: ref.querySelector(".hover-content"),
          opacity: [1, 0],
          translateY: [0, 20],
          easing: "easeOutExpo",
          duration: 500,
        });
      });
    });
  }, []);
  console.log(categories);

  return (
    <div className="xl:py-10" id="top">
      <div className="">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Content */}
          <div
            ref={leftBannerRef}
            className="left-content relative flex items-center"
          >
            <div className="thumb relative w-full ">
              <div className="inner-content bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center mx-auto absolute z-10 text-white p-4">
                <h4 className="text-4xl font-bold">We Are Gadget Cartel</h4>
                <span className="text-lg">Awesome, clean &amp; gadgets</span>
                <div className="main-border-button mt-4">
                  <a
                    href="#"
                    className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black"
                  >
                    Purchase Now!
                  </a>
                </div>
              </div>
              <Image
                src="/gadget_3.jpg"
                alt="Left Banner"
                width={700}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        {/* Right Content */}
<div className="right-content grid grid-cols-1 sm:grid-cols-2 gap-6">
  {categories?.length > 0 ? (
    categories.slice(0,4).map((category, index) => (
      <div
        key={index}
        className="relative overflow-hidden cursor-pointer group"
      >
        <div className="thumb relative">
          {/* Default black overlay with opacity */}
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-80"></div>
          
          {/* Inner content (title and description) */}
          <div className="inner-content absolute z-10 text-white p-4 transition-opacity duration-300 group-hover:opacity-0">
            <h4 className="text-2xl font-semibold">{category.title}</h4>
            <span className="text-sm">
              {category.description || "Explore our collection"}
            </span>
          </div>

          {/* Hover content with "Discover More" button */}
          <div className="hover-content absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <div className="inner text-center text-white">
              <h4 className="text-2xl font-semibold">{category.title}</h4>
              <p className="text-sm mb-4">
                {category.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit incid."}
              </p>
              <div className="main-border-button">
                <a
                  href={`/category/${category.slug.current}`}
                  className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black"
                >
                  Discover More
                </a>
              </div>
            </div>
          </div>

          {/* Category image */}
          {category.image && (
            <Image
              src={urlFor(category.image).url()} // Ensure this generates the full URL
              alt={category.title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    ))
  ) : (
    <p>Loading categories...</p>
  )}
</div>

        </div>
      </div>
    </div>
  );
}
