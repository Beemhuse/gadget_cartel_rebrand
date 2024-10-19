"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/reusables/LoadingScreen";
import useCurrencyFormatter from "@/components/hooks/useCurrencyFormatter";
import useCartStore from "@/components/store/cartStore";
import { getCookie } from "@/utils/getCookie";

const Checkout = () => {
  const { cart, clearCart } = useCartStore(); // Access Zustand store
  const formatCurrency = useCurrencyFormatter();
  const [serviceFees, setServiceFees] = useState([]);
  const [selectedServiceFee, setSelectedServiceFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Redirect to /menu if cart is empty
  useEffect(() => {
    if (cart?.length === 0) {
      router.push('/'); // Redirect to /menu if the cart is empty
    }
  }, [cart, router]);

  // Watch the selected location
  const selectedLocation = watch("serviceFee");

  useEffect(() => {
    // Update the service fee based on the selected location
    if (selectedLocation) {
      const selectedFee = serviceFees.find(
        (fee) => fee._id === selectedLocation
      );
      setSelectedServiceFee(selectedFee ? selectedFee.fee : 0);
    } else {
      setSelectedServiceFee(0);
    }
  }, [selectedLocation, serviceFees]);

  useEffect(() => {
    async function fetchServiceFees() {
      const query = `*[_type == "serviceFee"]`;
      const fetchedServiceFees = await client.fetch(query);
      setServiceFees(fetchedServiceFees);
    }

    fetchServiceFees();
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const vat = subtotal * 0.07;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const serviceFee = selectedServiceFee ?? 0;
    const vat = Number(subtotal) * 0.075;
    return Number(subtotal) + Number(serviceFee) + Number(vat);
  };

  const token = getCookie("gc_token");
  const id = getCookie("gc_user");

  const handleCheckout = async (data) => {
    try {
      if (data.firstName !== "") {
        setLoading(true);

        const userId = id;
        const orderData = {
          ...data,
          serviceFee: {
            _type: "reference",
            _ref: data.serviceFee,
          },
          cartItems: cart,
          userId,
          amount: Math.round(calculateTotal()),
        };

        const config = token
          ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          : {};

        await axios.post("/api/order", orderData, config).then((res) => {
          setLoading(false);
          clearCart(); // Clear the cart using Zustand
          toast.success("Order placed", {
            position: "top-right",
            duration: 3000,
          });
          const paymentLink =
            res?.data?.paymentResponse?.data?.authorization_url;

          if (paymentLink) {
            window.location.href = paymentLink;
          }
        });
      } else {
        toast.error("Please add an address to proceed with checkout");
      }
    } catch (error) {
      const errMsg = handleGenericError(error);
      toast.error(errMsg, {
        position: "top-right",
        duration: 3000,
      });
      setLoading(false);
      console.error("Error handling checkout:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
                <form
                  onSubmit={handleSubmit(handleCheckout)}
                  className="space-y-4"
                >
                  {/* Delivery Details Form */}
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.firstName && (
                      <p className="text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="streetAddress"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      {...register("streetAddress", {
                        required: "Street Address is required",
                      })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.streetAddress && (
                      <p className="text-red-600">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="apartment"
                    >
                      Apartment, floor, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      {...register("apartment")}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="townCity"
                    >
                      Town/City
                    </label>
                    <select
                      id="townCity"
                      {...register("townCity", {
                        required: "Town/City is required",
                      })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Lagos">Lagos</option>
                    </select>
                    {errors.townCity && (
                      <p className="text-red-600">{errors.townCity.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-600">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </button>
                </form>
              </div>

              {/* Summary Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <hr className="my-4" />
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </p>
                <p className="flex justify-between">
                  <span>VAT (7%)</span>
                  <span>{formatCurrency(vat)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Service Fee</span>
                  <span>{formatCurrency(selectedServiceFee)}</span>
                </p>
                <hr className="my-4" />
                <p className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <LoadingScreen />}
    </>
  );
};

export default Checkout