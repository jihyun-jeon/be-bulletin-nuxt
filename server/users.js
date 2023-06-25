const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getConnection = require('./db')

const router = Router() // router 객체는 라우팅 로직을 그룹화하여 분리합니다.

// <sign-up>
const hashPassword = async (password, saltRounds) => {
  const result = await bcrypt.hash(password, saltRounds)
  return result
}

router.post('/signup', async function (request, response) {
  const userPassword = request.body.password
  const hashedPassword = await hashPassword(userPassword, 10) // saltRounds : salt 강도 (10)

  const postData = { ...request.body, password: hashedPassword }

  const query = `INSERT INTO users SET ?`

  getConnection((conn) => {
    conn.query(query, [postData], (error, results) => {
      if (error) {
        console.error('Mysql Signup Error')
        response.status(500).send({ error: '데이터베이스 생성 실패' })
      } else {
        response.status(200).send({ message: 'signup success' })
      }
    })
    conn.release()
  })
})

// <login>
router.post('/login', function comparePasswords(request, response) {
  const { userEmail, userPassword } = request.body // jhplus13@naver.com
  const query = `select password from users where email = ?`

  getConnection((conn) => {
    conn.query(query, [userEmail], (error, results) => {
      if (error) {
        console.error('Mysql Login Error')
        response.status(500).send({ error: 'Internet server error' })
        return
      }

      if (!results.length) {
        response.status(401).send({ error: 'no exist user' })
        return
      }

      const hashedPassword = results[0].password

      bcrypt.compare(userPassword, hashedPassword, (err, result) => {
        if (err) {
          response.status(500).json({ error: 'Internal Server Error' })
        } else if (result) {
          // 비밀번호가 일치하는 경우 result: true
          const token = jwt.sign(userEmail, process.env.SECRET_KEY) // 사용자 정보와 비밀키를 이용해 JWT 토큰 생성
          response.status(200).json({ message: 'Login success', token })
        } else {
          response.status(401).json({ error: 'Invalid email or password' })
        }
      })
    })
    conn.release()
  })
})
module.exports = router
