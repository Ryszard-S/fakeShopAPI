const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')

mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name'
const PORT = process.env.PORT || 3000

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const options = require('./swagger')

const openapiSpecification = swaggerJsdoc(options)

mongoose.connect(MONGODB_URI, (mess, err) => {
  if (!err) {
    console.log('Connected to MONGODB')
  } else {
    console.log('Error connecting to MONGODB', err)
  }
})

const app = express()
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/auth', require('./routes/authRoutes'))
app.use('/product', require('./routes/productRoutes'))
app.use('/review', require('./routes/reviewRoutes'))
app.use('/card', require('./routes/cardRoutes'))

app.get('/', (req, res) => {
  res.status(200)
  res.json({ Odp: 'Hello World!' })
})

app.listen(PORT)
