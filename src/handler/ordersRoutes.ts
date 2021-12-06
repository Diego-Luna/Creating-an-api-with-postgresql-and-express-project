
import express, { Request, Response } from 'express'
import { Order, OrdersStore } from '../models/orders'

const store = new OrdersStore()

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  // app.post('/orders', create)
  // add product
  app.post('/orders/', addProduct)
}

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
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
  } catch (err) {
    console.log("** error en rutas **");

    res.status(400)
    res.json(`Error in addProduct`)
  }
}

export default orderRoutes;