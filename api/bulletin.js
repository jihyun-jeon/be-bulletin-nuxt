const fs = require('fs')
const { Router } = require('express')

const router = Router()

// Test route
// router.use('/test', (req, res) => {
//   res.end('Test API!')
// })

// home route
router.get('/api', function (request, response) {
  fs.readFile('./static/bulletin.json', (err, data) => {
    if (err) {
      console.log('err', err)
    }
    const bulData = JSON.parse(data)
    response.send(bulData)
  })
})

// detail route
// router.get('/detail', (req, res) => {
//   res.json({ message: 'Welcome  detail page' })
// })

module.exports = router
