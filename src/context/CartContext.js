// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Array of cart items

    // Logic for adding, removing, and updating items in the cart

    const addToCart = (item) => {
        setCart(prevCart => [...prevCart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
