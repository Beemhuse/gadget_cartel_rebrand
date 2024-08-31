"use client"
import ProductDetail from '@/components/pages/users/ProductDetail';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Example product data
const products = [
  {
    id: 1,
    slug: 'headphone',
    title: 'Headphone',
    price: 75,
    images: ['/headphones_a_3.webp', '/headphones_a_4.webp'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod.',
  },
  // ...other products
];

export default function Page({ params}) {
    const [product, setProduct] = useState(null);
 
  useEffect(() => {
    if (params.slug) {
      // Find the product based on the slug from the route
      const foundProduct = products.find((prod) => prod.slug === params.slug);
      setProduct(foundProduct);
    }
  }, [params.slug]); // Re-run the effect whenever the slug changes

 
  return product ? (
    <ProductDetail product={product} />
  ) : (
    <p>Loading...</p>
  );
}
