import express, { Request, Response } from 'express'
import productsRoutes from './handler/productsRoutes'
import usersRoutes from './handler/usersRoutes'
import bodyParser from 'body-parser'

const port: number = 4000

const app: express.Application = express()
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productsRoutes(app);
usersRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: http://localhost/${port}`)
})
