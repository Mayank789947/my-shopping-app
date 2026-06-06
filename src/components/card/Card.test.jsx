import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Card from "./Card";
import { CartContext } from "../../context/CartContext";
import userEvent from "@testing-library/user-event";

const product = {
    title: "Test Product",
    price: 29.99,
    image: "test.jpg",
    category: "electronics",
    rating: {
        rate: 4.5,
        count: 120,
    },
}

describe("Card component", () => {
    function renderCard(ui, addToCart = vi.fn()) {
        render(
            <CartContext.Provider
                value={{ addToCart }}
            >
                {ui}
            </CartContext.Provider>
        );

        return { addToCart };
    }

    it("renders product title and price", () => {

        renderCard(<Card product={product} />)

        expect(
            screen.getByText("Test Product")
        ).toBeInTheDocument();

        expect(
            screen.getByText("$29.99")
        ).toBeInTheDocument();
    });

    it("renders product image", () => {

        renderCard(<Card product={product} />);

        const image = screen.getByRole("img", { name: "Test Product" });

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test.jpg");
    });

    it("renders action buttons", () => {

        renderCard(<Card product={product} />);

        expect(
            screen.getByRole("button", { name: "View" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Add To Cart" })
        ).toBeInTheDocument();
    });

    it("calls onClick when view button is clicked", async () => {

        const mockOnClick = vi.fn();
        const user = userEvent.setup();

        renderCard(<Card product={product} onClick={mockOnClick} />);

        const viewBtn = screen.getByRole("button", { name: "View" });

        await user.click(viewBtn);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("calls addToCart when Add to Cart button is clicked", async () => {
        const user = userEvent.setup();
        const mockAddToCart = vi.fn();

        renderCard(<Card product={product} />, mockAddToCart);

        const addToCartBtn = screen.getByRole("button", { name: "Add To Cart" });

        await user.click(addToCartBtn);

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });
});