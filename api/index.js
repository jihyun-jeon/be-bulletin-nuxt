const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')

// Require API routes
const bulletin = require('./bulletin')
app.use('/bulletin', bulletin)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())
// app.use('/', express.static('static')); // 파일 자체를 응답하는 것.

// server Connect
app.listen(3000, () => {
  console.log('server start~!')
})

module.exports = app
