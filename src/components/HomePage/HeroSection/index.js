import React, {useEffect, useState} from "react";
import {Button, Carousel, message} from "antd";
import {BiChevronRight} from "react-icons/bi";
import Image from "next/image";
import {getProductByLimit} from "../../../../util";

const HeroSection = () => {
    const imageData = [
        {src: "/images/image.svg", alt: "Shoe 1"},
        {src: "/images/shoe2.svg", alt: "Shoe 2"},
        {src: "/images/image.svg", alt: "Shoe 3"},
    ];
    const cardVariants = {
        hidden: {opacity: 0, y: 20}, // Initial state: invisible, slightly elevated
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}, // Fade in and move up
        hover: {scale: 1.05}, // Slightly enlarge on hover
    };
    const [products, setProducts] = useState([]);
    const getProductsFromApi = async () => {
        const response = await getProductByLimit(3);
        if (response.responseCode === 200) {
            setProducts(response.result);
        } else {
            message.error("Something went wrong");
        }
    }
    useEffect(() => {
        getProductsFromApi();
    }, []);
    const gridVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {opacity: 1, scale: 1},
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
            {/*<div className="flex w-full h-full flex-row items-center justify-center mx-auto mt-12">*/}
            {/*    <motion.div*/}
            {/*        layout*/}
            {/*        className="flex flex-wrap w-4/5 justify-center items-center gap-4 p-4"*/}
            {/*        variants={gridVariants}*/}
            {/*        initial="hidden"*/}
            {/*        animate="visible"*/}
            {/*    >*/}
            {/*        <AnimatePresence>*/}
            {/*            {products?.map((product) => (*/}
            {/*                <motion.div key={product.id} layout>*/}
            {/*                    <Card className={"flex flex-col gap-4 drop-shadow-xl"}*/}
            {/*                          hoverable*/}
            {/*                          style={{width: 240}}*/}
            {/*                          cover={*/}
            {/*                              <img*/}
            {/*                                  style={{objectFit: 'cover', width: '100%', height: 240}}*/}
            {/*                                  alt={product.name}*/}

            {/*                                  src={product.image}*/}
            {/*                              />*/}
            {/*                          }*/}

            {/*                    >*/}
            {/*                        <Card.Meta className={"flex flex-col gap-3"}*/}
            {/*                                   title={product.title}*/}
            {/*                                   description={`$${product.price}`}/>*/}
            {/*                        <div className={"flex flex-row gap-3"}><Rate disabled*/}
            {/*                                                                     defaultValue={product.rating.rate}/>*/}
            {/*                            <p>{product.rating.count}</p></div>*/}

            {/*                    </Card>*/}
            {/*                </motion.div>*/}
            {/*            ))}*/}
            {/*        </AnimatePresence>*/}
            {/*    </motion.div>*/}
            {/*</div>*/}

        </div>
    );
};

export default HeroSection;
