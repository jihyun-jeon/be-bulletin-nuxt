//
const fs = require('fs')
const { Router } = require('express')

const router = Router() // router 객체는 라우팅 로직을 그룹화하여 분리합니다.


// home route
router.get('/', function (request, response) {
  fs.readFile('./static/bulletin.json', (err, data) => {
    if (err) {
      console.log('err', err)
      response.status(500).send('json Error');
      return;
    }
    const bulData = JSON.parse(data)
    response.status(200).send(bulData)
  })
})

router.delete('/delete/:boardId', function (request, response) {
  // [TODO]console.log(request.params)
})

// detail route
// router.get('/detail', (req, res) => {
//   res.json({ message: 'Welcome  detail page' })
// })

module.exports = router
