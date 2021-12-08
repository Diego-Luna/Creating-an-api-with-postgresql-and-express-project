# Storefront Backend Project

## Getting Started

1. Install dependencies:

```
npm install
```

2. Create user Postgres user:

```
su postgres
```

```
psql postgres
```

```
CREATE USER full_stack_user WITH PASSWORD 'password123';
```

3. We create the database:

```
CREATE DATABASE products_ecommerce;
```

4. You have to fill the file: `.env`, there is an example in the` .env.example`:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=products_ecommerce
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
```

5. The command to activate the project

```
npm run start
```

5. The command for testing

```
npm run test
```

## Database logic:

I made a table for the products, where null values are not accepted:

```sql
CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name VARCHAR NOT NULL,
     price integer NOT NULL
);
```

I made a table for users, where null values are not accepted:

```sql
CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     firstName VARCHAR NOT NULL,
     lastName VARCHAR NOT NULL,
     password VARCHAR NOT NULL
);
```

I made a table for orders, where null values are not accepted and we refer to the user. In the case of products, there is a Middleware that is in charge of checking that the product exists.

```sql
CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     id_product integer [] NOT NULL,
     user_id bigint REFERENCES users (id) NOT NULL,
     quantity integer [] NOT NULL,
     status_order boolean NOT NULL
);
```

## Routes:

### Products:

- The route to see all your products:

`` GET http:/localhost:8080/products`

- The path to view a particular product:

``GET http:/localhost:8080/products/:id`

- The path to create a product, but it has a middleware that verifies the JWT:

``POST http:/localhost:8080/products/:id`

How to send body Json information:

```json
{
  "name": "test 3",
  "price": 100
}
```

- The path to delete a product, but it has a middleware that checks the JWT:

``DELETE http:/localhost:8080/products/:id`

### Users:

All routes have a middleware that verifies the JWT:

- The path to see all users:

```
GET http:/localhost:8080/users
```

- The path to view a particular user:

```
GET http:/localhost:8080/users/:id
```

- The path to create a user,

```
POST http:/localhost:8080/users/:id
```

How to send body Json information:

```json
{
  "firstName": "name-2",
  "lastName": "last-2",
  "password": "password123"
}
```

- The path to authenticate

```
POST http:/localhost:8080/users/authenticate
```

- The path to modify a user,

```
POST http:/localhost:8080/users/:id
```

### Orders:

All routes have a middleware that verifies the JWT:

- The path to see all orders:

```
GET http:/localhost:8080/orders
```

- The path to view a particular order:

```
GET http:/localhost:8080/orders/:id
```

- The path to create an order,

```
POST http:/localhost:8080/orders/:id
```

How to send body Json information:

```json
{
    "user_id": 1,
    "status_order": false
}
```

- The path to see all ordersProducts:

```
GET http:/localhost:8080/orders/products
```

- The path to view a particular ordersProducts:

```
GET http:/localhost:8080/orders/products/:id
```

- The path to create an ordersProducts,

```
POST http:/localhost:8080/orders/products/:id
```

How to send body Json information:

```
POST http:/localhost:8080/orders/products/1
```

```json
{
    "productId": 1,
    "quantity" : 10
}
```