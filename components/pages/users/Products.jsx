"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import useCurrencyFormatter from '@/components/hooks/useCurrencyFormatter';
import { getCookie } from '@/utils/getCookie';
import Pagination from '@/components/reusables/Pagination';
import useCartStore from '@/components/store/cartStore';
import ProductCard from '@/components/card/ProductCard';
import toast from 'react-hot-toast';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';



async function getContent() {
  const query = `*[_type == "product" && !(_id in path("drafts.*"))] | order(sortOrder asc) {
    _id,
    title,
    slug,
    description,
    price,
    category->{
      title
    },
    status,
    sortOrder,
    images[]{asset->{url}},
  }`;

  const content = await client.fetch(query);
  return content;
}

// Main Products Component
const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [searchQuery, setSearchQuery] = useState("");
const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart);
  const formatCurrency = useCurrencyFormatter();

  const handleAddToCart = (product) => {
    try {
      addToCart(product, 1);
      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(err.message || "Failed to add item to cart", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getContent();
        setProducts(fetchedProducts);
      } catch (error) {
        toast.error("Failed to load products", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (slug) => {
    router.push(`/product/${slug}`)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search change
  };



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Combine category and search filtering
  const filteredProducts = products.filter((product) =>
    (!selectedCategory || product.category.title === selectedCategory) &&
    (product.title.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery) ||
    product.price.toString().includes(searchQuery))
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 mb-4 text-gray-700 bg-white border rounded-md focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-40"
        />

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="w-16 h-16 border-t-4 border-b-4 border-accent rounded-full animate-spin"></div>
            </div>
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No product available in this category.</p>
          )}
        </div>

        {/* Pagination Component */}
        <div className="my-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
     
    </div>
  );
};

export default Products;
