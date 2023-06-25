const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())

// Require API routes
const bulletin = require('./bulletin')
const users = require('./users')
app.use('/', users)
app.use('/api', authenticateToken, bulletin)

// 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    // 토큰이 없는 경우 또는 검증에 실패한 경우 에러 응답
    return res.status(401).json({ message: '인증되지 않은 요청입니다.' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log('token Err', err)
      return res.status(403).json({ message: '토큰 인증에 실패했습니다.' })
    }

    req.user = user // 토큰 검증이 성공한 경우 사용자 정보를 요청에 추가

    next() // 다음 미들웨어로 진행
  })
}

// app.use('/', express.static('static')); // 파일 자체를 응답하는 것.

// server Connect
app.listen(3000, () => {
  console.log('server start~!')
})

module.exports = app
