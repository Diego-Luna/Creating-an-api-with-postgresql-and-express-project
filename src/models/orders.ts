// @ts-ignore

import Client from '../database'

export type Order = {
  id?: number;
  id_product: number[];
  user_id: number[];
  quantity: number[];
  status_order: boolean;
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

      const sql = 'INSERT INTO orders (id_product, user_id, quantity, status_order) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn
        .query(sql, [b.id_product, b.user_id, b.quantity, b.status_order])

      const book = result.rows[0]

      conn.release()

      return book
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const book = result.rows[0]

      conn.release()

      return book
    } catch (err) {
      throw new Error(`Could not orders book ${id}. Error: ${err}`)
    }
  }
}