import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold)

    process.exit(1)
  }
}

export default connectDB
