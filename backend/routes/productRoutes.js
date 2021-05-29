import express from 'express'
import AsyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'

//@desc     Fetch All Products
//@route    GET/api/products
//@acess    public

router.get('/',AsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//@desc     Fetch Single Product
//@route    GET/api/products/:id
//@acess    public

router.get('/:id',AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not found' })
    }
  })
)

export default router
