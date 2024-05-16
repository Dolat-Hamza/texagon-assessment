import React, {useState} from 'react';
import {motion} from "framer-motion";
import Navbar from "@/components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";

const Layout = ({children}) => {
    // You can add any other layout-specific state or logic here
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col overflow-hidden min-h-screen">

            {/* Navbar */}
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>

            {/* Main Content (Pages) */}
            <main className="flex-grow flex flex-col overflow-auto h-full gap-6 w-full ">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Layout;
