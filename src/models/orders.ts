// @ts-ignore

import Client from '../database'

export type Order = {
  id?: number;
  user_id: string;
  status_order: boolean;
}
export type OrderProduct = {
  id?: number, quantity: number, order_id: string, product_id: string
}



export class OrdersStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find orders ${id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id, status_order) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      // user_id: string;
      // status_order: boolean;

      const result = await conn
        .query(sql, [b.user_id, b.status_order])

      const book = result.rows[0]

      conn.release()

      return book
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`)
    }
  }

  // async addProduct(id_product: number[], user_id: string, quantity: number[], status_order: boolean): Promise<Order> {
  async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const sql = 'INSERT INTO orderproducts (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
        .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }

  async indexsProducts(): Promise<OrderProduct[]> {
    try {

      console.log("orders model");

      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orderproducts'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orderproducts. Error: ${err}`)
    }
  }

  async showProduct(id: string): Promise<OrderProduct> {
    try {
      const sql = 'SELECT * FROM orderproducts WHERE order_id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find orderproducts ${id}. Error: ${err}`)
    }
  }

}
