"use client";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import { useState } from "react";
import useCartStore from "@/components/store/cartStore";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const totalQuantities = useCartStore((state) => state.totalQuantities());

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleCart} className="hover:text-green-800 relative">
        <FaOpencart className="text-xl" />
        {totalQuantities !== 0 && (
          <p className="absolute -top-2 right-0 bg-red h-4 w-4 text-white flex items-center justify-center p-1 text-sm rounded-full">
            {totalQuantities}
          </p>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 text-center w-64 bg-white shadow-lg rounded-lg z-10 p-4">
          {totalQuantities > 0 ? 
          <>
          <p>You have {totalQuantities} items in your cart  </p>
          <Link href="/cart" className="text-blue-500 hover:underline">
            Go to Cart
          </Link>
          </>:
          <>
          <p>Your cart is empty.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Go to home
          </Link>
          </>
          }
         
        </div>
      )}
    </div>
  );
}
