// components/ProductGrid.jsx

"use client";

import {useEffect, useState} from 'react';
import {Card, Carousel, Image, Input, InputNumber, message, Modal, Rate, Select} from 'antd';
import {AnimatePresence, motion} from 'framer-motion';
import {getProducts} from "../../../util";
import {useCart} from "@/context/CartContext";
const { Search } = Input;
const {Option} = Select; // For category filter dropdown
const gridVariants = {
    hidden: {opacity: 0, scale: 0.8}, visible: {opacity: 1, scale: 1},
};

const ProductGrid = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {addToCart, dispatch} = useCart(); // Access addToCart and dispatch from context
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const getProductsFromApi = async () => {
        const products = await getProducts();
        if (products.responseCode === 200) {
            setAllProducts(products.result.products);
            setFilteredProducts(products.result.products); // Initially show all products
        } else {
            message.error("Something went wrong");
        }
    };
    useEffect(() => {
        const filtered = allProducts.filter(product => {
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesSearch = !searchQuery ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        setFilteredProducts(filtered);
    }, [selectedCategory, searchQuery, allProducts]);

    useEffect(() => {
        getProductsFromApi()
    }, [])

    const dummyProducts = [{
        id: 1,
        name: 'Modern Backpack',
        price: 49.99,
        image: 'https://cdn.thewirecutter.com/wp-content/media/2023/08/laptopbackpacks-2048px-4023.jpg?auto=webp&quality=75&width=1024',
        images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
        description: 'Durable and stylish backpack for everyday use.',
    }, {
        id: 2,
        name: 'Wireless Headphones',
        images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
        price: 99.99,
        image: 'https://appleshop.com.pk/wp-content/uploads/2020/12/airpods-max-silver.png',
        description: 'High-quality wireless headphones with noise cancellation.',
    }, {
        id: 3,
        name: 'Stylish Sneakers',
        price: 79.99,
        image: '/images/shoe2.svg',
        description: 'Comfortable and trendy sneakers for a casual look.',
        images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
    }, {
        id: 4,
        name: 'Smartwatch',
        price: 149.99,
        image: 'https://www.paklap.pk/media/catalog/product/cache/2cc443e44e97595ea39006016c876eaa/a/p/apple-mreh3-watch-ultra-2.jpg.webp',
        description: 'Feature-rich smartwatch with fitness tracking and notifications.',
        images: ['/images/image.svg', '/images/shoe2.svg', '/images/image.svg'],
    },];

    const [quantity, setQuantity] = useState(1);
    const [hovered, setHovered] = useState(false)

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };
    const handleMouseEnter = () => {
        setHovered(true);
    };
    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (<div className={"flex flex-col gap-4 items-center w-full justify-center"}>
        <h1 className={"text-4xl font-bold text-center"}>Shop</h1>
        <div className={"w-4/5 flex flex-row justify-between"}>
            <Search
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 200, marginBottom: 20 }}
            />
            <Select rootClassName={"capitalize"}
                placeholder="Select a category"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                style={{width: 200, marginBottom: 20}}
            >
                <Option value={null}>All</Option>
                {/* Generate options based on your actual categories */}
                {[...new Set(allProducts.map(item => item.category))].map((category, index) => (
                    <Option className={"capitalize"} key={index} value={category}>{category}</Option>
                ))}
            </Select>
        </div>
        <div className={"w-full flex flex-wrap justify-center items-center"}>

            <motion.div
                layout
                className="flex flex-wrap w-4/5 justify-center items-center gap-4 p-4"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {filteredProducts?.map((product) => (<motion.div key={product.id} layout>
                        <Card className={"flex flex-col gap-4 drop-shadow-xl"}
                              hoverable
                              style={{width: 240}}
                              cover={<Image
                                  style={{objectFit: 'cover', width: '100%', height: 240}}
                                  alt={product.title}
                                  src={product.thumbnail}
                              />}

                        >
                            <Card.Meta className={"flex flex-col gap-3"} onClick={() => openModal(product)}
                                       title={product.title}
                                       description={`$${product.price}`}/>
                            <div className={"flex flex-row gap-3"}>
                                <Rate allowHalf rootClassName={"text-blue-400"} disabled
                                      defaultValue={product.rating}/>
                                <p>{product.rating.count}</p></div>

                        </Card>
                    </motion.div>))}
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
                        <div className="relative w-fit md:w-1/2">
                            <Carousel effect="fade" arrows={false} dots={false} autoplay
                                      className="w-full  mx-auto">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index + 1}`}

                                        className="w-full h-full object-cover"
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            <div className={"capitalize"}>
                                <h2 className="text-2xl font-sans mb-2 font-semibold">{selectedProduct.title}</h2>
                                <p className="text-gray-600 mb-2">£{selectedProduct.price}</p>
                                <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Brand:</h1>
                                    <p>{selectedProduct.brand}</p>
                                </div>
                                <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Stock Available</h1>
                                    <p>{selectedProduct.stock}</p></div>
                                <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Category</h1>
                                    <p>{selectedProduct.category}</p></div>
                                <h1 className={"font-bold"}>Product Description:</h1>
                                <p className="text-sm text-gray-500">
                                    {selectedProduct.description}
                                </p>
                            </div>

                            {/* Quantity selection */}
                            <div className="flex items-center gap-4 mt-2">
                                <label htmlFor="quantity">Quantity:</label>
                                <InputNumber
                                    id="quantity"
                                    min={1}
                                    disabled={disabled}
                                    value={quantity}
                                    onError={
                                        (value) => {
                                            message.error("Quantity exceeds stock")
                                        }
                                    }
                                    defaultValue={1}
                                    onChange={(value) => {
                                        console.log("here is value", value)
                                        if (value > selectedProduct.stock) {
                                            setDisabled(true)

                                            message.error("Quantity exceeds stock").then(() => {
                                                setDisabled(false)
                                            })
                                        } else {
                                            setDisabled(false)
                                            setQuantity(value)
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={
                                    () => {
                                        addToCart({...selectedProduct, quantity})
                                        closeModal()
                                    }
                                }

                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    </div>);
};

export default ProductGrid;
