"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Define menu items
const menuItems = [
  { name: 'Home', href: '/' },
  { name: "Collections", href: '/#men' },
  { name: "Products", href: '/#women' },
  { name: "About us", href: '/#kids' },
  { name: "Contact us", href: '/#kids' },
  
  
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null); // State to manage which submenu is open
  const navRef = useRef(null);
  const dropdownRefs = useRef([]);
  const logoRef = useRef(null);

  // Anime.js animations
  useEffect(() => {
    // Animate the logo
    anime({
      targets: logoRef.current,
      opacity: [0, 1],
      translateX: [-50, 0],
      easing: 'easeOutExpo',
      duration: 1000,
    });

    // Animate the navigation links
    anime({
      targets: navRef.current.querySelectorAll('a'),
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: anime.stagger(100, { start: 500 }), // Stagger animation
      easing: 'easeOutExpo',
      duration: 800,
    });

    // Animate the dropdown menus
    dropdownRefs.current.forEach((dropdown) => {
      anime({
        targets: dropdown,
        opacity: [0, 1],
        translateY: [-10, 0],
        easing: 'easeOutExpo',
        duration: 500,
        delay: anime.stagger(100), // Stagger animation for dropdown items
      });
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubMenuToggle = (index) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" ref={logoRef}>
            <Image src="/gadget_logo.jpg" alt="Logo" width={50} height={50} />
            <span className="ml-2 font-bold text-xl">Gadget Cartel</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center" ref={navRef}>
            {menuItems.map((item, index) => (
              item.subMenu ? (
                <div key={index} className="relative group">
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-500"
                    onClick={() => handleSubMenuToggle(index)}
                  >
                    {item.name}
                    {openSubMenuIndex === index ? (
                      <FaChevronUp className="ml-1 text-xs" />
                    ) : (
                      <FaChevronDown className="ml-1 text-xs" />
                    )}
                  </button>
                  <ul
                    ref={el => dropdownRefs.current[index] = el}
                    className={`absolute left-0 mt-1 bg-white shadow-md rounded-lg transition-all duration-300 ease-out transform ${
                      openSubMenuIndex === index ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0'
                    }`}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.external ? (
                          <a href={subItem.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">
                            {subItem.name}
                          </a>
                        ) : (
                          <Link href={subItem.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {subItem.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link key={index} href={item.href} className="text-gray-700 hover:text-blue-500">
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <button className="md:hidden text-gray-700 hover:text-blue-500" onClick={toggleMenu}>
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            {menuItems.map((item, index) => (
              item.subMenu ? (
                <div key={index}>
                  <button
                    className="flex items-center justify-between w-full text-left py-2 text-gray-700 hover:text-blue-500"
                    onClick={() => handleSubMenuToggle(index)}
                  >
                    {item.name}
                    {openSubMenuIndex === index ? (
                      <FaChevronUp className="ml-1 text-xs" />
                    ) : (
                      <FaChevronDown className="ml-1 text-xs" />
                    )}
                  </button>
                  <ul className={`pl-4 space-y-2 ${openSubMenuIndex === index ? 'block' : 'hidden'}`}>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.external ? (
                          <a href={subItem.href} className="block py-2 text-gray-700 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                            {subItem.name}
                          </a>
                        ) : (
                          <Link href={subItem.href} className="block py-2 text-gray-700 hover:text-blue-500">
                            {subItem.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link key={index} href={item.href} className="block py-2 text-gray-700 hover:text-blue-500">
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
