// import express, { Request, Response } from 'express'
// import bodyParser from 'body-parser'

// const app: express.Application = express()
// const address: string = "0.0.0.0:3000"

// app.use(bodyParser.json())

// app.get('/', function (req: Request, res: Response) {
//   res.send('Hello World!')
// })

// app.listen(3000, function () {
//   console.log(`starting app on: ${address}`)
// })

import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD } = process.env

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
})

export default client