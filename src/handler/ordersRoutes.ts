
import express, { Request, Response } from 'express'
import { Order, OrdersStore } from '../models/orders'

const store = new OrdersStore()

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders/:id', show)
  app.post('/orders/', addProduct)
}

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.send(`Error -> ${error}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.send(`Error -> ${error}`)
  }
}

// ... other methods
const addProduct = async (_req: Request, res: Response) => {

  const order: Order = {
    id_product: _req.body.id_product,
    user_id: _req.body.user_id,
    quantity: _req.body.quantity,
    status_order: _req.body.status_order
  }

  try {

    console.log("> order");
    console.log(order);


    const addedProduct = await store.addProduct(order.id_product, order.user_id, order.quantity, order.status_order)
    res.json(addedProduct)
  } catch (error) {
    console.log("**error en rutas **");

    res.status(400)
    res.send(`Error -> ${error}`)
  }
}

export default orderRoutes;