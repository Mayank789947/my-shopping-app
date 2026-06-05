import { createContext, useEffect, useState } from "react";

const CartContext = createContext()

function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log("CartProvider mounted");
    }, []);

    function addToCart(product) {
        console.log("Added to cart successfully", product)

        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    function decrementQuantity(id) {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);

            if (!existingItem) return prevCart;

            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== id);
            }

            return prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
