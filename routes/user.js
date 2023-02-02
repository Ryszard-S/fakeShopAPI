const express = require('express')
const router = express.Router()

// default to path "/user"
router.get('/', (req, res) => {
  res.send('User List')
})

// path "/user/new"
router.get('/new', (req, res) => {
  res.send('New User')
})
router.post('/new', (req, res) => {
  const answer = true
  if (answer) {
    res.status(200).json(req.body)
  } else {
    res.status(500).json({ Odp: 'False' })
  }

  console.log(req.body)
})
router.get('/:id', (req, res) => {
  let id = req.params.id
  res.send(`User Get With ID ${id}`)
})

router.put('/:id', (req, res) => {
  let id = req.params.id
  res.send(`User Get With ID ${id}`)
})

router.delete('/:id', (req, res) => {
  let id = req.params.id
  res.send(`User Get With ID ${id}`)
})

module.exports = router
