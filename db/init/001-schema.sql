CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

INSERT INTO categories (name) VALUES
    ('Groceries'),
    ('Transportation'),
    ('Hobbies'),
    ('Dining out');

INSERT INTO expenses (description, amount, date) VALUES
    ('Grocery shopping', 50.00, '2023-01-15'),
    ('Bus ticket', 2.50, '2023-01-16'),
    ('Movie night', 15.00, '2023-01-17'),
    ('Dinner at restaurant', 30.00, '2023-01-18');