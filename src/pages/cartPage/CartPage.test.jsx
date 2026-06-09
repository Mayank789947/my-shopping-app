import { describe, expect, it, vi } from "vitest";
import { CartContext } from "../../context/CartContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartPage from "./CartPage";
import userEvent from "@testing-library/user-event";

vi.mock("../../components/header/Header", () => ({
    default: () => <div>Header</div>,
}));

vi.mock("../../components/cartItem/CartItem", () => ({
    default: ({ item }) => (
        <div>{item.title}</div>
    ),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual(
        "react-router-dom"
    );

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

function renderCartPage(cart = []) {
    return render(
        <MemoryRouter>
            <CartContext.Provider
                value={{
                    cart,
                }}
            >
                <CartPage />
            </CartContext.Provider>
        </MemoryRouter>
    );
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

beforeEach(() => {
    mockNavigate.mockClear();
});

describe("CartPage", () => {
    it("shows empty cart message when cart is empty", () => {
        renderCartPage([]);

        expect(
            screen.getByText("Your cart is empty")
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Looks like you haven't added anything yet."
            )
        ).toBeInTheDocument();
    });

    it("renders header", () => {
        renderCartPage(cart);

        expect(
            screen.getByText("Header")
        ).toBeInTheDocument();
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

    it("renders order summary when cart has items", () => {
        renderCartPage(cart);

        expect(
            screen.getByText("Order Summary")
        ).toBeInTheDocument();
    });

    it("shows checkout button when cart has items", () => {
        renderCartPage(cart);

        expect(
            screen.getByRole("button", {
                name: "Proceed To Checkout",
            })
        ).toBeInTheDocument();
    });

    it("does not show checkout button when cart is empty", () => {
        renderCartPage([]);

        expect(
            screen.queryByRole("button", {
                name: "Proceed To Checkout",
            })
        ).not.toBeInTheDocument();
    });

    it("navigates to checkout page when checkout button is clicked", async () => {
        const user = userEvent.setup();

        renderCartPage(cart);

        await user.click(
            screen.getByRole("button", {
                name: "Proceed To Checkout",
            })
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/checkout"
        );
    });
});