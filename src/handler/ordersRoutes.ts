
import express, { Request, Response } from 'express'
import { Order, OrdersStore } from '../models/orders'
// import checkProducts from '../middleware/checkProducts'

const store = new OrdersStore()

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/products', indexProducts)

  app.get('/orders/:id', show)
  app.get('/orders/products/:id', showProducts)

  app.post('/orders', create)
  app.post('/orders/products/:id', addProduct)

}

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const create = async (req: Request, res: Response) => {

  try {
    const product: Order = {
      user_id: req.body.user_id,
      status_order: req.body.status_order
    }


    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const addProduct = async (_req: Request, res: Response) => {

  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {

    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (error) {
    console.log("**error en rutas **");


    res.status(400).send(`Error -> ${error}`)
  }
}
const indexProducts = async (_req: Request, res: Response) => {
  try {
    console.log("-> Rutas indexProducts");

    const products = await store.indexsProducts()
    res.json(products)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const showProducts = async (req: Request, res: Response) => {
  try {
    const product = await store.showProduct(req.params.id)
    res.json(product)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

export default orderRoutes;