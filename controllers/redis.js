var redisClient = require('redis').createClient({url: process.env.REDIS_URL})
redisClient.on('connect', function () {
  console.log('Redis server online.')
})
redisClient.connect()
module.exports = redisClient
