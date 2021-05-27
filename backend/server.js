import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import connectDB from './config/db.js'

//Connect Database
connectDB()

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Api is runnig...')
})

//Fetch hall Products
app.get('/api/products', (req, res) => {
  res.json(products)
})
//Fetch Single Product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on ${PORT}`.yellow.underline
  )
)
