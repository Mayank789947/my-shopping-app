import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorPage from "/src/components/error/ErrorPage.jsx"

describe("ErrorPage component", () => {
    it("renders provided title", () => {
        render(<ErrorPage
            title="Something went wrong"
            message="Failed to fetch data"
        />);

        const titleText = screen.getByRole("heading", { name: "Something went wrong" });

        expect(titleText).toBeInTheDocument();
    });

    it("renders provided message", () => {
        render(<ErrorPage
            title="Something went wrong"
            message="Failed to fetch data"
        />);

        const messageText = screen.getByText("Failed to fetch data");

        expect(messageText).toBeInTheDocument();
    });

    it("renders default message when message prop is not provided", () => {
        render(<ErrorPage
            title="Something went wrong"
        />);

        const messageText = screen.getByText("Something unexpected happened.");

        expect(messageText).toBeInTheDocument();
    });
});