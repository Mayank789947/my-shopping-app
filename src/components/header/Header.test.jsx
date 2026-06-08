import { render, screen } from "@testing-library/react";
import { CartContext } from "../../context/CartContext";
import Header from "./Header";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
});

function renderHeader(cart = []) {
    render(
        <MemoryRouter>
            <CartContext.Provider value={{ cart }}>
                <Header />
            </CartContext.Provider>
        </MemoryRouter>
    );
}

afterEach(() => {
    vi.clearAllMocks();
});

describe("Header component", () => {
    it("renders header items", () => {
        renderHeader();

        expect(screen.getByText("Shoppers")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Products")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("renders navigation links with correct routes", () => {
        renderHeader();

        expect(
            screen.getByRole("link", { name: "Home" })
        ).toHaveAttribute("href", "/");

        expect(
            screen.getByRole("link", { name: "Products" })
        ).toHaveAttribute("href", "/products");

        expect(
            screen.getByRole("link", { name: "About" })
        ).toHaveAttribute("href", "/about");
    });

    it("navigates to cart page", async () => {
        const user = userEvent.setup();

        renderHeader();

        const cartIcon = screen.getByTestId("cart-container");

        await user.click(cartIcon);

        expect(mockNavigate).toHaveBeenCalledWith("/cartpage");
    });

    it("shows cart count when cart has items", () => {
        renderHeader([
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ]);

        expect(screen.getByText("3"))
            .toBeInTheDocument();
    });

    it("does not show badge when cart is empty", () => {
        renderHeader();

        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("opens mobile menu when hamburger button is clicked", async () => {
        const user = userEvent.setup();

        renderHeader();

        const menuButton = screen.getByRole("button", {
            name: "Toggle navigation menu",
        });

        await user.click(menuButton);

        expect(
            screen.getByRole("link", { name: "Home" })
        ).toBeVisible();
    });
});