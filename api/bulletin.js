// const fs = require('fs')
import { COUNTITEM } from '../constant'
const { Router } = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'secretKey'

// [질문] mysql 연결을 index.js에서 공통적으로 처리하는 식으로는 안될지?

// [순서]5 - db 연결
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'bulletin',
  password: '1234',
  multipleStatements: true,
})

// DB Connect
connection.connect(function (err) {
  if (err) {
    console.error('mysql 연결 실패')
    throw err
  } else {
    console.log('mysql 연결 성공')
  }
})

const router = Router() // router 객체는 라우팅 로직을 그룹화하여 분리합니다.

// <home all GET>
// [TODO] api짜는 쪽에서 토큰 받아 토큰 인증 미들웨어 구현해야 함
router.get('/get', authenticateToken, function (request, response) {
  const { page, size } = ('request', request.query)

  // SELECT * FROM boards LIMIT <페이지당 자료 개수> OFFSET <몇번째 row부터 출력할 지. (1번째 row면 0)>
  const query = `SELECT * FROM boards ORDER BY id DESC LIMIT ${size}  OFFSET ${
    (page - 1) * COUNTITEM
  };` // offset 0 10 20
  const countQuery = 'SELECT count(*) as total FROM boards;'

  connection.query(query + countQuery, (error, results) => {
    // console.log("results",results) // [[{},{},{}...],[total:56]]
    if (error) {
      console.error('MySql get요청 에러', error)
      response.status(500).send({ error: '데이터베이스 조회 실패' })
    } else {
      response.status(200).send({
        data: results[0],
        total: results[1][0].total,
      })
    }
  })
})

// 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers.Authorization?.split(' ')[1]
  console.log('token', req.headers.Authorization) // [TODO] undefined

  // if (!token) {   // 토큰이 없는 경우 또는 검증에 실패한 경우 에러 응답
  //   return res.status(401).json({ message: '토큰이 없습니다.' })
  // }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      console.log('token Err', err)
      //   return res.status(403).json({ message: '토큰 인증에 실패했습니다.' })
    }

    // req.user = user // 토큰 검증이 성공한 경우 사용자 정보를 요청에 추가

    next() // 다음 미들웨어로 진행
  })
}

// <detail one item GET>
router.get('/get/:boardId', function (request, response) {
  const itemId = request.params.boardId
  const query = `SELECT * FROM boards WHERE id = ${itemId}`

  connection.query(query, (error, results) => {
    if (error) {
      console.error('MySql item get요청 에러', error)
      response.status(500).send({ error: '데이터베이스 조회 실패' })
    } else {
      response.status(200).send(results)
    }
  })
})

// <one item DELETE>
router.delete('/delete/:itemId', function (request, response) {
  const itemId = ('params', request.params.itemId)

  const deleteQuery = `DELETE FROM boards WHERE id = ${itemId}`

  connection.query(deleteQuery, (error, results) => {
    if (error) {
      console.error('MySql item delete 요청 에러', error)
      response.status(500).send({ error: '데이터베이스 삭제 실패' })
    } else {
      response.status(200).send({ message: 'delete success' })
    }
  })
})

// <one item POST>
// [TODO] 문서 보기 https://www.npmjs.com/package/mysql#escaping-query-values
// Escaping query values
router.post('/post', function (request, response) {
  const postData = request.body
  console.log('postData', postData)

  const query = `insert into boards set ?`
  connection.query(query, [postData], (error, results) => {
    if (error) {
      console.error('MySql item post 요청 에러', error)
      response.status(500).send({ error: '데이터베이스 생성 실패' })
    } else {
      response.status(200).send({ message: 'post success' })
    }
  })
})

// <one item PATCH>
router.patch('/patch/:id', function (request, response) {
  const updateData = request.body
  const boardId = request.params.id

  const query = 'UPDATE boards SET ? where id = ?'
  connection.query(query, [updateData, boardId], (error, results) => {
    if (error) {
      console.error('MySql item patch 요청 에러', error)
      response.status(500).send({ error: '데이터베이스 수정 실패' })
    } else {
      response.status(200).send({ message: 'patch success' })
    }
  })
})

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
  connection.query(query, [postData], (error, results) => {
    if (error) {
      console.error('Mysql Signup Error')
      response.status(500).send({ error: '데이터베이스 생성 실패' })
    } else {
      response.status(200).send({ message: 'signup success' })
    }
  })
})

// <login>
router.post('/login', function comparePasswords(request, response) {
  const { userEmail, userPassword } = request.body // jhplus13@naver.com
  const query = `select password from users where email = ?`

  connection.query(query, [userEmail], (error, results) => {
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
        const token = jwt.sign(userEmail, SECRET_KEY) // 사용자 정보와 비밀키를 이용해 JWT 토큰 생성
        response.status(200).json({ message: 'Login success', token })
      } else {
        response.status(401).json({ error: 'Invalid email or password' })
      }
    })
  })
})

module.exports = router
