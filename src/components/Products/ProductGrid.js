// components/ProductGrid.jsx

"use client";

import {useState} from 'react';
import {Row, Col, Card, Modal, Image, Carousel} from 'antd';
import {motion, AnimatePresence} from 'framer-motion';

const gridVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1},
};

const ProductGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dummyProducts = [
        {
            id: 1,
            name: 'Modern Backpack',
            price: 49.99,
            image: 'https://cdn.thewirecutter.com/wp-content/media/2023/08/laptopbackpacks-2048px-4023.jpg?auto=webp&quality=75&width=1024',
            images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
            description: 'Durable and stylish backpack for everyday use.',
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
            price: 99.99,
            image: 'https://appleshop.com.pk/wp-content/uploads/2020/12/airpods-max-silver.png',
            description: 'High-quality wireless headphones with noise cancellation.',
        },
        {
            id: 3,
            name: 'Stylish Sneakers',
            price: 79.99,
            image: '/images/shoe2.svg',
            description: 'Comfortable and trendy sneakers for a casual look.',
            images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
        },
        {
            id: 4,
            name: 'Smartwatch',
            price: 149.99,
            image: 'https://www.paklap.pk/media/catalog/product/cache/2cc443e44e97595ea39006016c876eaa/a/p/apple-mreh3-watch-ultra-2.jpg.webp',
            description: 'Feature-rich smartwatch with fitness tracking and notifications.',
            images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
        },
    ];

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <>
        <motion.div
            layout
            className="flex flex-wrap justify-center items-start gap-4 p-4"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {dummyProducts.map((product) => (
                    <motion.div key={product.id} layout>
                        <Card
                            hoverable
                            style={{width: 240}}
                            cover={
                                <Image
                                    style={{objectFit: 'cover', width: '100%', height: 240}}
                                    alt={product.name}
                                    src={product.image}
                                />
                            }

                        >
                            <Card.Meta onClick={() => openModal(product)} title={product.name}
                                       description={`$${product.price}`}/>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        <Modal
            title={null}  // Remove title
            open={!!selectedProduct}
            onCancel={closeModal}
            width={800}   // Adjust width as needed
            footer={null}
            className="quick-view-modal" // Add a custom class for styling
        >
            {selectedProduct && (
                <div className="flex flex-col md:flex-row gap-8 p-4">
                    {/*<div className="relative w-full md:w-1/2">*/}
                    {/*    <Image*/}
                    {/*        src={selectedProduct.image}*/}
                    {/*        alt={selectedProduct.name}*/}
                    {/*        className="w-full h-auto"*/}
                    {/*    />*/}
                    {/*    /!* Add image carousel indicators here if needed *!/*/}
                    {/*</div>*/}
                    <div className="relative w-fit md:w-1/2">
                        <Carousel effect="fade" arrows={false} dots={false} autoplay
                                  className="w-full  mx-auto">
                            {selectedProduct.images.map((image, index) => (
                                <div key={index}>
                                    <Image

                                        src={image}
                                        alt={selectedProduct.name}
                                        className="w-full h-auto bg-no-repeat bg-center bg-cover"
                                    />
                                </div>
                            ))}
                    </Carousel>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div>
                <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
        <p className="text-gray-600 mb-2">
            £{selectedProduct.price}
        </p>
        <p className="text-sm text-gray-500">
            This is a variable product.
        </p>
        </div>

{/* Color and Logo Selection */
}
    <div className="flex flex-col gap-2">
        {/* Replace these with your actual options */}
        <label htmlFor="color">Color:</label>
        <select id="color" className="border p-2 rounded">
            <option value="">Choose an option</option>
        </select>

        <label htmlFor="logo">Logo:</label>
        <select id="logo" className="border p-2 rounded">
            <option value="">Choose an option</option>
        </select>
    </div>

    <div className="flex items-center gap-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
        </button>
        <div>
            <p className="text-sm text-gray-500">
                SKU: {selectedProduct.id}
            </p>
            <p className="text-sm text-gray-500">
                Category: Hoodies
            </p>
        </div>
    </div>
</div>
</div>
)}
</Modal>
</>
)
    ;
};

export default ProductGrid;
