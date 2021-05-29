import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

//Connect Database
connectDB()

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Api is runnig...')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on ${PORT}`.yellow.underline
  )
)
