import React from "react";
import {Button, Carousel} from "antd";
import { BiChevronRight } from "react-icons/bi";
import { motion } from "framer-motion"; // Import Framer Motion
import Image from "next/image";
const HeroSection = () => {
    const imageData = [
        { src: "/images/image.svg", alt: "Shoe 1" },
        { src: "/images/shoe2.svg", alt: "Shoe 2" },
        { src: "/images/image.svg", alt: "Shoe 3" },
    ];
    const cardVariants = {
        hidden: { opacity: 0, y: 20 }, // Initial state: invisible, slightly elevated
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and move up
        hover: { scale: 1.05 }, // Slightly enlarge on hover
    };
    return (
        <div
            className="bg-gradient-to-br from-blue-200 to-blue-500 h-full justify-center py-10 flex flex-col gap-10 items-center">
            <div
                className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between">

                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                        Are you ready to <span className="text-yellow-400">lead the way</span>
                    </h1>
                    <p className="text-white text-lg md:text-xl mb-8">
                        Mauris porta lectus nulla, non dignissim dolor sollicitudin et. Sed mi tortor, aliquam eget
                        congue a, faucibus sed est.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        className="bg-yellow-400 hover:bg-yellow-500 text-white transition duration-300 flex items-center"
                        icon={<BiChevronRight className="ml-2"/>} // Add margin to the icon
                    >
                        Buy Now
                    </Button>
                </div>

                {/* Shoe Image */}
                <div className="md:w-1/2 ">
                    <Carousel effect="fade" arrows={false} dots={false} autoplay
                              className="w-full  mx-auto">
                        {imageData.map((image, index) => (
                            <div key={index}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={500} // Set appropriate width and height for optimal display
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="flex w-full h-full flex-row items-center justify-center mx-auto mt-12">
                <motion.div
                    initial="hidden" // Set the initial animation state
                    whileInView="visible" // Trigger animation when in viewport
                    viewport={{once: true}} // Animate only once
                    className="flex-row flex gap-8 w-full h-full items-center justify-center "
                >
                    {/* Map through shoe data to create multiple cards */}
                    {[...Array(3)].map((_, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover" // Trigger hover animation
                            className="bg-white rounded-lg shadow-md px-7 py-4 flex flex-col gap-4  items-center"
                        >
                            <Image
                                width={200}
                                height={200}
                                src="https://img.freepik.com/free-photo/ice-coffee-with-whipped-cream_144627-3801.jpg?t=st=1715847651~exp=1715851251~hmac=5de1037002f3906dc17355fe01ee616da9fa5b0596b486a34733579fffb95897&w=740"
                                alt={`Shoe ${index + 1}`}
                                className="rounded-full object-cover shadow-xl drop-shadow"
                            />
                            <p className="text-gray-600 font-semibold">Mauris Porta</p>
                            <p className="text-gray-800 font-bold text-lg">$322.99</p>
                            <Button
                                type="primary"
                                size="small"
                                className="mt-2"
                            >
                                +
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Additional Shoe Cards (Optional) */}

        </div>
    );
};

export default HeroSection;
