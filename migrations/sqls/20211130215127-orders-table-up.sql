CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    id_product integer[] NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    quantity integer[] NOT NULL,
    status_order  boolean NOT NULL
);


