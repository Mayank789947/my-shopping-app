import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Products from "./Products";

vi.mock("../../components/loading/Loading", () => ({
    default: () => <div>Loading...</div>,
}));

vi.mock("../../components/header/Header", () => ({
    default: () => <div>Header</div>,
}));

vi.mock("../../components/card/Card", () => ({
    default: ({ product }) => (
        <div>{product.title}</div>
    ),
}));

vi.mock("../../components/error/ErrorPage", () => ({
    default: ({ title, message }) => (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    ),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

describe("Products Page", () => {
    it("shows loading indicator initially", () => {

        vi.spyOn(global, "fetch").mockImplementation(
            () => new Promise(() => { })
        );

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Loading...")
        ).toBeInTheDocument();
    });

    it("fetches products on mount", async () => {
        const mockProducts = [];

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProducts,
        });

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        expect(fetch).toHaveBeenCalledWith(
            "https://fakestoreapi.com/products"
        );
    });

    it("renders products after successful fetch", async () => {
        const mockProducts = [
            {
                id: 1,
                title: "Shirt",
                price: 20,
                image: "shirt.jpg",
                category: "clothing",
                rating: {
                    rate: 4.5,
                    count: 100,
                },
            },
        ];

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProducts,
        });

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const product = await screen.findByText("Shirt");

        expect(product).toBeInTheDocument();
    });

    it("renders all fetched products", async () => {
        const mockProducts = [
            { id: 1, title: "Shirt" },
            { id: 2, title: "Shoes" }
        ]

        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockProducts
        });

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(await screen.findByText("Shirt"))
            .toBeInTheDocument();

        expect(await screen.findByText("Shoes"))
            .toBeInTheDocument();
    });

    it("shows error page when fetch fails", async () => {
        vi.spyOn(global, "fetch").mockRejectedValue(
            new Error("Network Error")
        );

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(
            await screen.findByText("Unable to load products")
        ).toBeInTheDocument();

        expect(
            await screen.findByText("Network Error")
        ).toBeInTheDocument();
    });
});