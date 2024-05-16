// context/CartContext.jsx
import {createContext, useContext, useEffect, useReducer} from 'react';

const CartContext = createContext(null);
const initialState = {cartItems: []};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex > -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].quantity += action.payload.quantity; // Increment existing quantity
                return {cartItems: updatedCartItems};
            } else {
                return {cartItems: [...state.cartItems, action.payload]};
            }
        }
        case 'REMOVE_ITEM':
            return {cartItems: state.cartItems.filter(item => item.id !== action.payload)};
        case 'UPDATE_ITEM_QUANTITY': {
            return {
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? {...item, quantity: action.payload.quantity} : item
                )
            };
        }
        case 'CLEAR_CART':
            return initialState;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (storedCartItems.length > 0) {
            dispatch({ type: 'ADD_ITEM', payload: storedCartItems });
        }
    }, []);

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);
    const addToCart = (product) => {
        console.log("Here are items", product)
        dispatch({
            type: 'ADD_ITEM',
            payload: {...product, quantity: product.quantity || 1} // Default to 1 if quantity is not provided
        });
    };

    const removeFromCart = (productId) => {
        dispatch({type: 'REMOVE_ITEM', payload: productId});
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        dispatch({type: 'UPDATE_ITEM_QUANTITY', payload: {id: itemId, quantity: newQuantity}});
    };

    const clearCart = () => {
        dispatch({type: 'CLEAR_CART'});
    };

    const getCartItem = (itemId) => {
        return state.cartItems.find(item => item.id === itemId);
    };

    const getAllCartItems = () => {
        return state.cartItems;
    };

    const contextValue = {
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartItem,
        getAllCartItems,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export {CartProvider, useCart};
