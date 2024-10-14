"use client";
import ProductDetail from "@/components/pages/users/ProductDetail";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.slug) {
        try {
          const query = `*[_type == "product" && slug.current == $slug][0]{
            _id,
            title,
            price,
            description,
            quote,
            "images": images[].asset->url,
            "slug": slug.current
          }`;
          const productData = await client.fetch(query, { slug: params.slug });
          if (productData) {
            setProduct(productData);
          } else {
            setError("Product not found.");
          }
        } catch (err) {
          setError("Error fetching product data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return product ? (
    <ProductDetail product={product} />
  ) : (
    <p>Product not found.</p>
  );
}
