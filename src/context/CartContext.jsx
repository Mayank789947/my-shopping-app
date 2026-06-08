import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

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
    }

    function incrementQuantity(id) {
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
    }

    function decrementQuantity(id) {
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
    }

    function removeFromCart(id) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };