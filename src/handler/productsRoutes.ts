import express, { Request, Response } from 'express'
import { Product, ProductsStore } from '../models/products'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new ProductsStore()

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  // app.post('/products/', verifyAuthToken, create)
  app.post('/products/', create)
  app.delete('/products/:id', verifyAuthToken, destroy)
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
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    }


    const newProduct = await store.create(product)
    console.log('--> Funciono en create routes ');
    res.json(newProduct)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

export default productRoutes;