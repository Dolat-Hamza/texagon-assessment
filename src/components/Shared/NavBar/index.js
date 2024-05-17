// components/Navbar.jsx
import React, {useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Badge, Modal} from "antd";
import {useCart} from "@/context/CartContext";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Cart from "@/components/Products/Cart";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import {useAuth} from "@/context/AuthContext";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const {cartItems} = useCart();

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const {isAuthenticated,logout} = useAuth();
    console.log(isAuthenticated)


    function LogoutUser() {
        logout()
        // console.log("Yolo")
    }

    return (
        <motion.nav
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-lg"
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
                    {isAuthenticated ? (
                        <NavLink href="#" onClick={()=>{
                           LogoutUser()}}>Logout</NavLink>
                    ) : (
                        <NavLink href={"#"} onClick={() => setLogin(true)}>Login</NavLink>
                    )}
                    {!isAuthenticated && (
                        <NavLink href={"#"} onClick={() => setRegister(true)}>Register</NavLink>
                    )}
                </div>

                {/* Cart Icon */}
                <Badge count={cartItems.length} showZero onClick={openCart}>
                    <AiOutlineShoppingCart style={{fontSize: 24}}/>
                </Badge>

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
                        {isAuthenticated ? (
                            <NavLink href="#" onClick={()=>{
                                LogoutUser()}}>Logout</NavLink>
                        ) : (
                            <NavLink href={"#"} onClick={() => setLogin(true)}>Login</NavLink>
                        )}
                        {!isAuthenticated && (
                            <NavLink href={"#"} onClick={() => setRegister(true)}>Register</NavLink>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Cart Modal */}

            <Modal open={login} onCancel={() => {
                setLogin(false)
            }}>
                <Login onClose={() => {
                    setLogin(false)
                }}/>
            </Modal>
            <Modal open={register} onCancel={() => {
                setRegister(false)
            }}>
                <Register onClose={() => {
                    setRegister(false)
                }}/>
            </Modal>

            {/* Your cart content here */}
            <Cart visible={isCartOpen} onCancel={closeCart}/> {/* Render the cart component */}

        </motion.nav>
    );
};

const NavLink = ({href, children, onClick}) => (
    <Link
        href={href}
        onClick={onClick}
        className="relative group text-gray-800 transition duration-300"
    >
        {children}
        <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 origin-left scale-x-0 transform group-hover:scale-x-100 transition-transform duration-300"
        />
    </Link>
);


export default Navbar;

