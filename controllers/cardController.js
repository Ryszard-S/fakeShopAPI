const Product = require('../models/Product')
const Review = require('../models/Review')
const User = require('../models/User')
const redis = require('./redis')

// @desc Get all products
// @route GET /products
// @access Public
const getCard = async (req, res) => {

  const { id } = req.userInfo

  const obj = await redis.hGetAll(`card${id}`)
  const x = Object.entries(obj).map(([key, value]) => {
    return {
      productId: key,
      qty: value
    }
  })

  return res.json({ cardList: x })
}

const addProductToCard = async (req, res) => {
  const { id } = req.userInfo
  const { cardList } = req.body
  if (!cardList) return res.status(400).json({ message: 'Card list is empty' })
  cardList.forEach((product) => {
    redis.hSet(`card${id}`, product.productId, product.qty)
  })

  const obj = await redis.hGetAll(`card${id}`)
  const x = Object.entries(obj).map(([key, value]) => {
    return {
      productId: key,
      qty: value
    }
  })

  return res.json({ cardList: x })
}

const removeProductFromCard = async (req, res) => {
  const { id } = req.userInfo
  const { productIds } = req.body

  productIds.forEach((productId) => {
    redis.hDel(`card${id}`, productId)
  })

  const obj = await redis.hGetAll(`card${id}`)
  const x = Object.entries(obj).map(([key, value]) => {
    return {
      productId: key,
      qty: value
    }
  })

  return res.json({ cardList: x })
}

const clearAllCard = async (req, res) => {
  const { id } = req.userInfo
  redis.del(`card${id}`)
  return res.status(204).json({ message: 'Card cleared' })
}

module.exports = {
  getCard,
  addProductToCard,
  removeProductFromCard,
  clearAllCard
}
