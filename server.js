const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name'
const PORT = process.env.PORT || 3000
mongoose.connect(MONGODB_URI, (mess, err) => {
  console.log('Connected to MONGODB')
})

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/auth', require('./routes/authRoutes'))
app.use('/product', require('./routes/productRoutes'))
app.use('/review', require('./routes/reviewRoutes'))
app.use('/card', require('./routes/cardRoutes'))

app.get('/', (req, res) => {
  res.status(500)
  res.json({ Odp: 'Hello World!' })
})

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(PORT)
