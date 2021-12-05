// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS } = process.env

if (typeof BCRYPT_PASSWORD == 'undefined' || typeof SALT_ROUNDS == 'undefined') {
  console.log('Error in BCRYPT_PASSWORD or SALT_ROUNDS is undefined');
  Error('Error in BCRYPT_PASSWORD or SALT_ROUNDS is undefined')
} else {
  var pepper: string = BCRYPT_PASSWORD;
  var saltRounds: string = SALT_ROUNDS;
}


export type User = {
  id?: Number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {

  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      //@ts-ignoreX$
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.firstName, u.lastName, hash])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable create user (firstName :${u.firstName} lastName: ${u.lastName}): ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {



    const conn = await Client.connect()

    const sql = 'SELECT password FROM users WHERE firstName=($1)'

    const result = await conn.query(sql, [username])

    if (result.rows.length) {

      const user = result.rows[0]

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user
      }
    }

    return null
  }
}


