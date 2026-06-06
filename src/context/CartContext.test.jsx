import { useContext } from "react";
import { CartContext, CartProvider } from "./CartContext";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const product1 = {
    id: 1,
    title: "Shirt",
    price: 20,
};

const product2 = {
    id: 2,
    title: "Shoes",
    price: 50,
};

function TestComponent() {
    const {
        cart,
        addToCart,
        decrementQuantity,
        removeFromCart,
    } = useContext(CartContext);

    return (
        <>
            <button onClick={() => addToCart(product1)}>
                Add Product 1
            </button>

            <button onClick={() => addToCart(product2)}>
                Add Product 2
            </button>

            <button onClick={() => decrementQuantity(1)}>
                Decrement Product 1
            </button>

            <button onClick={() => removeFromCart(1)}>
                Remove Product 1
            </button>

            <div data-testid="cart">
                {JSON.stringify(cart)}
            </div>
        </>
    );
}

function renderCartProvider() {
    return render(
        <CartProvider>
            <TestComponent />
        </CartProvider>
    );
}

describe("CartContext", () => {

    describe("initial state", () => {
        it("starts with an empty cart", () => {

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            expect(cart).toHaveTextContent([]);
        });
    });

    describe("add to cart", () => {
        it("adds a product to an empty cart", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const button = screen.getByRole("button", { name: "Add Product 1" });

            await user.click(button);

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":1');
        });

        it("increases quantity when same product is added twice", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const button = screen.getByRole("button", { name: "Add Product 1" });

            await user.click(button);
            await user.click(button);

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":2');
        });

        it("adds multiple different products", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const button1 = screen.getByRole("button", { name: "Add Product 1" });

            const button2 = screen.getByRole("button", { name: "Add Product 2" });

            await user.click(button1);
            await user.click(button2);

            const cartData = JSON.parse(cart.textContent);

            expect(cartData).toHaveLength(2);
        });
    });

    describe("decrement quantity", () => {
        it("decreases quantity when quantity is greater than one", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const incrementButton = screen.getByRole("button", { name: "Add Product 1" });

            await user.click(incrementButton);
            await user.click(incrementButton);

            const decrementButton = screen.getByRole("button", { name: "Decrement Product 1" });

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":2');

            await user.click(decrementButton);

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":1');
        });

        it("removes item when quantity becomes zero", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const incrementButton = screen.getByRole("button", { name: "Add Product 1" });

            await user.click(incrementButton);

            const decrementButton = screen.getByRole("button", { name: "Decrement Product 1" });

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":1');

            await user.click(decrementButton);

            expect(cart).not.toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent("[]");
        });

        it("does nothing when decrementing a product that does not exist", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart");

            const decrementButton = screen.getByRole("button", {
                name: "Decrement Product 1",
            });

            await user.click(decrementButton);

            expect(cart).toHaveTextContent("[]");
        });
    });

    describe("removeFromCart", () => {
        it("removes a product completely from the cart", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart")

            const incrementButton = screen.getByRole("button", { name: "Add Product 1" });

            await user.click(incrementButton);
            await user.click(incrementButton);

            const removeButton = screen.getByRole("button", { name: "Remove Product 1" });

            expect(cart).toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent('"quantity":2');

            await user.click(removeButton);

            expect(cart).not.toHaveTextContent("Shirt");
            expect(cart).toHaveTextContent("[]");
        });

        it("does nothing when removing a product that does not exist", async () => {
            const user = userEvent.setup();

            renderCartProvider();

            const cart = screen.getByTestId("cart");

            const removeButton = screen.getByRole("button", {
                name: "Remove Product 1",
            });

            await user.click(removeButton);

            expect(cart).toHaveTextContent("[]");
        });
    });
});