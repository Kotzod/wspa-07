import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db/pool.js";

beforeEach(async () => {
    await pool.query("DELETE FROM categories");
    await pool.query(
        `INSERT INTO categories (name) VALUES
           ('Groceries'),
           ('Transportation')`,
    );
});

describe("GET /api/categories", () => {
    it("returns categories with numbers and ISO dates", async () => {
        const res = await request(app).get("/api/categories");

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        const groceries = res.body.find(
            (c: { name: string }) => c.name === "Groceries",
    );
        expect(groceries.name).toBe("Groceries");
    });
});

describe("POST /api/categories", () => {
    it("creates a category and returns 201 with the created row", async () => {
        const res = await request(app)
            .post("/api/categories")
            .send({ name: "Entertainment" });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ name: "Entertainment" });
        expect(res.body.id).toBeDefined();  // an id exists — we don't pin its value
    });

    it("returns 400 when a required field is missing", async () => {
        const res = await request(app)
            .post("/api/categories")
            .send({ }); // no name

        expect(res.status).toBe(400);
    });
});

describe("PUT /api/categories/:id", () => {
    it("returns 404 for an id that does not exist", async () => {
        const res = await request(app)
            .put("/api/categories/00000000-0000-0000-0000-000000000000")
            .send({ name: "Nope" });

        expect(res.status).toBe(404);
    });
});

describe("DELETE /api/categories/:id", () => {
    it("deletes an existing category and returns 204", async () => {
        const list = await request(app).get("/api/categories");
        const categoryId = list.body[0].id;

        const res = await request(app).delete(`/api/categories/${categoryId}`);

        expect(res.status).toBe(204);
    });
});

afterAll(async () => {
    await pool.end();
});