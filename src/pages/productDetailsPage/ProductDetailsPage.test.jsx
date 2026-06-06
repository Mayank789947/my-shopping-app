import { render, screen, waitFor } from "@testing-library/react";
import { CartContext } from "../../context/CartContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductDetailsPage from "./ProductDetailsPage";
import userEvent from "@testing-library/user-event";

vi.mock("../../components/loading/Loading", () => ({
    default: () => <div>Loading...</div>,
}));

vi.mock("../../components/header/Header", () => ({
    default: () => <div>Header</div>,
}));

vi.mock("../../components/error/ErrorPage", () => ({
    default: ({ title, message }) => (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    ),
}));

const mockProduct = {
  id: 1,
  title: "Shirt",
  price: 20,
  category: "clothing",
  description: "Nice shirt",
  image: "shirt.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

function renderProductPage(addToCart = vi.fn()) {
    return render(
        <CartContext.Provider
            value={{
                cart: [],
                addToCart,
            }}
        >
            <MemoryRouter initialEntries={["/products/1"]}>
                <Routes>
                    <Route
                        path="/products/:id"
                        element={<ProductDetailsPage />}
                    />
                </Routes>
            </MemoryRouter>
        </CartContext.Provider>
    );
}


afterEach(() => {
  vi.restoreAllMocks();
});

describe("Product Details Page", () => {
    it("shows loading indicator initially", () => {
        vi.spyOn(global, "fetch").mockImplementation(
            () => new Promise(() => { })
        );

        renderProductPage();

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("fetches product using route id", async () => {

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProduct
        });

        renderProductPage();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        });

        expect(fetch).toHaveBeenCalledWith(
            "https://fakestoreapi.com/products/1"
        );

    });

    it("renders product details after successful fetch", async () => {

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProduct
        });

        renderProductPage();

        expect(await screen.findByText("Shirt"))
            .toBeInTheDocument();

        expect(
            screen.getByText("$20")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Nice shirt")
        ).toBeInTheDocument();
    });

    it("shows error page when fetch fails", async () => {
        vi.spyOn(global, "fetch").mockRejectedValue(
            new Error("Network Error")
        );

        renderProductPage();

        expect(
            await screen.findByText("Unable to load product")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Network Error")
        ).toBeInTheDocument();
    });

    it("calls addToCart when Add To Cart button is clicked", async () => {
        const user = userEvent.setup();

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProduct,
        });

        const mockAddToCart = vi.fn();
        renderProductPage(mockAddToCart);

        const button = await screen.findByRole("button", { name: "Add To Cart" });

        await user.click(button);

        expect(mockAddToCart).toHaveBeenCalledWith(
            mockProduct
        );

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });
});