CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    id_product bigint REFERENCES products(id) NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    quantity integer[] NOT NULL,
    status_order  boolean NOT NULL
);


