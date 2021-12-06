import express, { Request, Response } from 'express'
import { Product, ProductsStore } from '../models/products'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new ProductsStore()

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products/', verifyAuthToken, create)
  app.delete('/products/:id', verifyAuthToken, destroy)
}


const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
}

const create = async (req: Request, res: Response) => {

  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    }


    const newProduct = await store.create(product)
    console.log('--> Funciono');
    res.json(newProduct)
  } catch (err) {
    console.log('--> no funciono');
    console.log(err);

    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id)
  res.json(deleted)
}

export default productRoutes;