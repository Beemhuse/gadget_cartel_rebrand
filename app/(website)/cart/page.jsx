"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { RiDeleteBinLine } from "react-icons/ri";
import useCurrencyFormatter from '@/components/hooks/useCurrencyFormatter';
import useCartStore from '@/components/store/cartStore';

export default function Cart() {
  const cartItems = useCartStore((state) => state.cart); // Retrieve cart items from Zustand
  const addToCart = useCartStore((state) => state.addToCart); // Add product to cart (if not already there)
  const incrementQuantity = useCartStore((state) => state.incrementQuantity); // Increment item quantity
  const decrementQuantity = useCartStore((state) => state.decrementQuantity); // Decrement item quantity
  const removeFromCart = useCartStore((state) => state.removeFromCart); // Remove item from cart

  const formatCurrency = useCurrencyFormatter(); // Use currency formatter hook
  // Calculate subtotal of all items in the cart
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Handle removing an item from the cart
  const handleRemoveCartItem = (id) => {
    removeFromCart(id);
    toast.success("Item removed successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Handle incrementing quantity of an item in the cart
  const handleIncrement = (id) => {
    incrementQuantity(id);
  };

  // Handle decrementing quantity of an item in the cart
  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  return (
    <>
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto py-20 lg:py-20">
          {cartItems?.length === 0 ? (
            <div className="text-center mt-8">
              <h2 className="text-xl font-semibold mb-6">Your cart is empty</h2>
              <Link href="/">
                <button className="mt-4 border border-gray-300 px-4 py-2 rounded-md">
                  Return To Shop
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-right">Price</th>
                      <th className="px-4 py-2 text-center">Quantity</th>
                      <th className="px-4 py-2 text-right">Subtotal</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-2 flex items-center">
                          <Image
                            src={item?.images[0]}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="hidden md:block w-10 h-10 mr-2 object-cover"
                          />
                          {item.title}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              className="px-2 py-1 border rounded-l"
                              onClick={() => handleDecrement(item.id)}
                            >
                              -
                            </button>
                            <span className="px-2 py-1 border-t border-b">
                              {item.quantity.toString().padStart(2, '0')}
                            </span>
                            <button
                              className="px-2 py-1 border rounded-r"
                              onClick={() => handleIncrement(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div
                            className="text-red-600 flex justify-center items-center py-2 rounded-md cursor-pointer"
                            onClick={() => handleRemoveCartItem(item.id)}
                          >
                            <RiDeleteBinLine />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <Link href="/menu">
                  <button className="border border-gray-300 px-4 py-2 rounded-md mb-4 md:mb-0">
                    Return To Shop
                  </button>
                </Link>
                <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/3">
                  <h2 className="text-lg font-bold mb-4">Cart Total</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>Enter your address to view shipping options.</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <Link href="/checkout">
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                      Proceed to checkout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
