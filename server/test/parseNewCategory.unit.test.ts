import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category.js";

describe("parseNewCategory", () => {
    it("returns the parsed category when the body is valid", () => {
        const result = parseNewCategory({
            name: "Electronics",
        });
        expect(result).toEqual({ name: "Electronics" });
    });

    it("returns null when name is missing", () => {
        const result = parseNewCategory({ });
        expect(result).toBeNull();
    });

    it("returns null when name is a number, not a string", () => {
        const result = parseNewCategory({
            name: 123,   // wrong type
        });
        expect(result).toBeNull();
    });

    it("returns null for a completely empty body", () => {
        expect(parseNewCategory({})).toBeNull();
    });
});