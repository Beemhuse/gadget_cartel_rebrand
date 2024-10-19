"use client";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProfile = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button className="text-gray-700 hover:text-blue-500" onClick={toggleProfile}>
        <FaUserCircle className="text-2xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10 p-4">
          <Link href="/profile" className="block py-2 text-gray-700 hover:text-blue-500">
            Profile
          </Link>
          <Link href="/orders" className="block py-2 text-gray-700 hover:text-blue-500">
            Orders
          </Link>
          <Link href="/settings" className="block py-2 text-gray-700 hover:text-blue-500">
            Settings
          </Link>
          <Link href="/logout" className="block py-2 text-gray-700 hover:text-blue-500">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
