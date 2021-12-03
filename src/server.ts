import express, { Request, Response } from 'express'
import productRoutes from './handler/productsRoutes'
import bodyParser from 'body-parser'

const port: number = 4000

const app: express.Application = express()
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: http://localhost/${port}`)
})
