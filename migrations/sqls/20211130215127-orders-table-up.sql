CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    id_product bigint REFERENCES products(id),
    user_id bigint REFERENCES users(id),
    quantity integer[],
    status_order  boolean
);


