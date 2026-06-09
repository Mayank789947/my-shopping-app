import { createContext, useRef, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    const timeoutRef = useRef(null);

    function showNotification(message, type = "success") {
        setNotification({ message, type });

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setNotification(null);
        }, 2000);
    }

    function addToCart(product) {
        setCart((prevCart) => {
            const itemExists = prevCart.some(
                (item) => item.id === product.id
            );

            if (itemExists) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });

        showNotification(
            `${product.title} added to cart`,
            "success"
        );
    }

    function incrementQuantity(id, title) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );

        showNotification(
            `${title} quantity updated`,
            "info"
        );
    }

    function decrementQuantity(id, title) {
        setCart((prevCart) =>
            prevCart.reduce((updatedCart, item) => {
                if (item.id !== id) {
                    updatedCart.push(item);
                    return updatedCart;
                }

                if (item.quantity > 1) {
                    updatedCart.push({
                        ...item,
                        quantity: item.quantity - 1,
                    });
                }

                return updatedCart;
            }, [])
        );

        showNotification(
            `${title} quantity updated`,
            "info"
        );
    }

    function removeFromCart(id, title) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );

        showNotification(
            `${title} removed from cart`,
            "error"
        );

    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                notification,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };