import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa'; // Import from react-icons/fa

const Footer = () => {
    return (
        <motion.footer
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-gray-900 text-white py-6 mt-8"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Brand/Logo */}
                    <Link href="/">
                        <h1 className="text-xl font-bold text-white">Your Brand</h1>
                    </Link>

                    {/* Quick Links */}
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <FooterLink href="/">Home</FooterLink>
                        <FooterLink href="/about">About</FooterLink>
                        <FooterLink href="/contact">Contact</FooterLink>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-4"><SocialLink href="https://www.facebook.com/yourbrand">
                        <FaFacebook size={24}/>
                    </SocialLink>
                        <SocialLink href="https://www.twitter.com/yourbrand">
                            <FaTwitter size={24}/>
                        </SocialLink>
                        <SocialLink href="https://www.instagram.com/yourbrand">
                            <FaInstagram size={24}/>
                        </SocialLink>
                        <SocialLink href="https://www.linkedin.com/in/yourbrand">
                            <FaLinkedin size={24}/>
                        </SocialLink>
                    </div>
                </div>
                <p className="text-center mt-4 text-gray-400">
                    &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
                </p>
            </div>
        </motion.footer>
    );
};

const FooterLink = ({
                        href, children
                    }) => (
    <Link
        href={href}
        className="text-gray-300 hover:text-white transition duration-300 relative"
    >
        {children}
        <motion.span
            className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 transform group-hover:scale-x-100 transition-transform duration-300"
        />
    </Link>
);
const SocialLink = ({
                        href, children
                    }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition duration-300"
    >
        {children}
    </a>
);

export default Footer;
