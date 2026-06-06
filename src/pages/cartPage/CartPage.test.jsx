import { describe, expect, it, vi } from "vitest";
import { CartContext } from "../../context/CartContext";
import { render, screen } from "@testing-library/react";
import CartPage from "./CartPage";

vi.mock("../../components/header/Header", () => ({
    default: () => <div>Header</div>,
}));

vi.mock("../../components/cartItem/CartItem", () => ({
    default: ({ item }) => (
        <div>{item.title}</div>
    ),
}));

function renderCartPage(cart = []) {
    return render(
        <CartContext.Provider
            value={{
                cart,
            }}
        >
            <CartPage />
        </CartContext.Provider>
    )
}

const cart = [
    {
        id: 1,
        title: "Shirt",
        price: 20,
        quantity: 2,
    },
    {
        id: 2,
        title: "Shoes",
        price: 50,
        quantity: 1,
    },
];

describe("Cart Page", () => {
    it("shows empty cart message when cart is empty", () => {
        renderCartPage([]);

        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("renders cart items", () => {
        renderCartPage(cart);

        expect(
            screen.getByText("Shirt")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Shoes")
        ).toBeInTheDocument();
    });

    it("calculates total items correctly", () => {
        renderCartPage(cart);

        expect(
            screen.getByTestId("total-items")
        ).toHaveTextContent("3");
    });

    it("calculates total price correctly", () => {
        renderCartPage(cart);

        expect(
            screen.getByTestId("total-price")
        ).toHaveTextContent("$90.00");
    });

    it("shows checkout button when cart has items", () => {
        renderCartPage(cart);

        expect(
            screen.getByRole("button", {
                name: "Checkout",
            })
        ).toBeInTheDocument();
    });

    it("does not show checkout button when cart is empty", () => {
        renderCartPage([]);

        expect(
            screen.queryByRole("button", {
                name: "Checkout",
            })
        ).not.toBeInTheDocument();
    });
});