"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import InputComponent from "@/components/reusables/input/InputComponent";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCookies from "@/components/hooks/useCookies";
import LoadingScreen from "@/components/reusables/LoadingScreen";
import { handleGenericError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import InputComponent from "@/components/reusables/input/InputComponent";
import Image from "next/image";
// import { handleGenericError } from "@/utils/errorHandler";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const { setCookie } = useCookies();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      setLoading(true);
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Signup successful");
      setCookie("gc_token", response?.data?.token);
      // router.push("/login");
    } catch (error) {
      const errMsg = handleGenericError(error);
      toast.error(errMsg);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="p-5 border-b-2">
        <Image
          src="/gadget_logo.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="ml-0"
        />
      </div>
      <div className=" mt-5 flex items-center flex-col justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10  shadow-md flex flex-col gap-4 rounded-lg max-w-md mx-auto"
        >
          <h2 className="text-3xl text-center text-accent font-bold">
            Sign up
          </h2>
          <InputComponent
            label="Name"
            placeholder="John Doe"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <InputComponent
            label="Email"
            placeholder="johndoe@gmail.com"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <InputComponent
            label="Password"
            placeholder="Password"
            name="password"
            register={register}
            password
            error={errors.password?.message}
            type="password"
          />
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="terms"
                {...register("terms")}
                className="form-checkbox"
              />
              <span className="ml-2">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create an account"}
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-500">
              Log in
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
