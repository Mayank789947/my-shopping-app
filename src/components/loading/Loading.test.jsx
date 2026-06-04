import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "./Loading";

describe("Loading Spinner Component", () => {
    it("renders loading spinner", () => {
        render(<Loading />);

        const loadingSpinner = screen.getByTestId("loading-spinner");

        expect(loadingSpinner).toBeInTheDocument();
    });
});