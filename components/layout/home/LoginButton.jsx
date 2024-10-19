"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function LoginButton() {
  return (
    <Link href="/login" className="text-gray-700 hover:text-blue-500">
      <FaUser className="text-2xl" />
    </Link>
  );
}
