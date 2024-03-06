CREATE TABLE users (
    id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password VARCHAR(100)
);

CREATE TABLE phones (
    id SERIAL PRIMARY KEY, name VARCHAR(100), brand VARCHAR(100), model VARCHAR(100), price NUMERIC, color VARCHAR(50)
);

INSERT INTO
    phones (
        name, brand, model, price, color
    )
VALUES (
        'Xiaomi Redmi 9', 'Xiaomi', 'Redmi 9', 10000, 'red'
    ),
    (
        'Samsung Galaxy S24', 'Samsung', 'Galaxy S20', 80000, 'black'
    ),
    (
        'iPhone 12', 'Apple', 'iPhone 12', 120000, 'white'
    ),
    (
        'OnePlus 12', 'OnePlus', '12', 70000, 'green'
    ),
    (
        'Google Pixel 8', 'Google', 'Pixel 5', 90000, 'black'
    ),
    (
        'Huawei P40 Pro', 'Huawei', 'P40 Pro', 85000, 'blue'
    );