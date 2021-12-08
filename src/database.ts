import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env


let client = ENV === 'dev' ? new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
}) : new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

console.log(ENV)
console.log(POSTGRES_HOST)
console.log(POSTGRES_DB)
console.log(POSTGRES_DB_TEST)
console.log(POSTGRES_USER)
console.log(POSTGRES_PASSWORD)

export default client
