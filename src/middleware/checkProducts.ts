// import { Request, Response } from 'express';
// import { Product, ProductsStore } from '../models/products';
// import { Order } from '../models/orders';

// const store = new ProductsStore()

// const isNumer = (value: number) => typeof value === 'number';


// const checkProducts = async (req: Request, res: Response, next: Function) => {

//   try {
//     const order: Order = {
//       id_product: req.body.id_product,
//       user_id: req.body.user_id,
//       quantity: req.body.quantity,
//       status_order: req.body.status_order
//     }

//     if (!Array.isArray(order.id_product) && !Array.isArray(order.quantity)) {
//       return res.status(400).send(`Error -> in ${order.id_product}`)

//     }

//     if (order.id_product.length === 0 && order.quantity.length === 0) {
//       return res.status(400).send(`Error -> in ${order.id_product}`)

//     }

//     if (!(order.id_product.length === order.quantity.length)) {
//       return res.status(400).send(`Error -> in ${order.id_product}`)

//     }

//     var result_val: Product[] = [];
//     for (var i = 0; i < Number(order.id_product.length); i++) {
//       const product = await store.show(String(order.id_product[i]))
//       console.log("-> product");
//       console.log(product);

//       if (product === undefined) {
//         return res.status(400).send(`Error -> The product not exist: ${order.id_product[i]} `)
//       }

//       result_val.push(product);
//     }

//     if (result_val.length === order.id_product.length) {
//       next()
//     }

//   } catch (error) {

//     return res.status(400).send(`Error -> in the id_product `)
//   }
// }

// export default checkProducts;
