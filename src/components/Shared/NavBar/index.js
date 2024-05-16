import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-lg" // Blur effect
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <Link href="/public">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        Your Brand
                    </h1>
                </Link>

                <div className="hidden md:flex space-x-6">
                    {/* Desktop Navigation */}
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/cart">Cart</NavLink>
                    <NavLink href="/checkout">Checkout</NavLink>
                    <NavLink href="/about">About</NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 w-full bg-white p-4 rounded-md shadow-lg"
                    >
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/cart">Cart</NavLink>
                        <NavLink href="/checkout">Checkout</NavLink>
                        <NavLink href="/about">About</NavLink>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="relative group text-gray-800 transition duration-300" // Add group class
    >
        {children}
        <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 origin-left scale-x-0 transform group-hover:scale-x-100 transition-transform duration-300"
        />
    </Link>

);

export default Navbar;
