import express, { Request, Response } from 'express'
import productsRoutes from './handler/productsRoutes'
import usersRoutes from './handler/usersRoutes'
import orderRoutes from './handler/ordersRoutes'
import bodyParser from 'body-parser'

const port: number = 4000

const app: express.Application = express()
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send(`
    Creating-an-api-with-postgresql-and-express-project-starter,
    By: Diego Francisco Luna Lopez
    `)
})

productsRoutes(app);
usersRoutes(app);
orderRoutes(app);

app.get('*', (req: Request, res: Response): void => {
    res.redirect('/');
});


app.listen(port, function () {
    console.log(`starting app on: http://localhost/${port}`)
})
