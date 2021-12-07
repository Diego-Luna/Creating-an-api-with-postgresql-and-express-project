// @ts-ignore

import Client from '../database'

export type Order = {
  id?: number;
  id_product: number[];
  user_id: string;
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
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find orders ${id}. Error: ${err}`)
    }
  }

  async addProduct(id_product: number[], user_id: string, quantity: number[], status_order: boolean): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (id_product, user_id, quantity, status_order) VALUES($1, $2, $3 ,$4) RETURNING *'
      const conn = await Client.connect()

      console.log("-> Base de datos conectada");

      // id_product: number[];
      // user_id: number[];
      // quantity: number[];
      // status_order: boolean;

      const result = await conn
        .query(sql, [id_product, user_id, quantity, status_order])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      console.log("--> Error :");
      console.log(err);

      throw new Error(`Could not add product ${id_product} to order ${user_id}: ${err}`)

    }
  }
}