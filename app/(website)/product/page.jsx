"use client"
import Category from "@/components/pages/users/CategoryComponent";
import Products from "@/components/pages/users/Products";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const query = `*[_type == "product" && status == true && !(_id in path("drafts.*"))] | order(sortOrder asc) {
          _id,
          title,
          description,
          price,
          category->{
            _id,
            title,
          },
          images {
            asset->{
              url
            }
          }
        }`;
        const result = await client.fetch(query);
console.log(result);

        // Extract unique categories from the fetched dishes
        const uniqueCategories = Array.from(
          new Set(result.map((dish) => dish.category._id))
        ).map((id) => {
          return result.find((dish) => dish.category._id === id).category;
        });

        setCategories(uniqueCategories);

        // Automatically select the first category on load
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0].title);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  // Function to handle category selection and update selectedCategory state
  const handleCategorySelect = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };
  
  return (
    <div className="bg-white min-h-screen border border-t-2">
      <h1 className="text-center font-bold text-4xl text-green-600 mb-5 pt-5">
        Products
      </h1>
      <div className="container mx-auto">
        <Category
          onCategorySelect={handleCategorySelect}
          categories={categories}
        />
      </div>
      <Products  selectedCategory={selectedCategory} />
    </div>
  );
}
