CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    id_product text,
    quantity text,
    -- user_id REFERENCES users(id)
    status_order  VARCHAR(150)
);