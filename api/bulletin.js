// const fs = require('fs')
const { Router } = require('express')
const mysql = require('mysql')

// [질문] mysql 연결을 index.js에서 공통적으로 처리하는 식으로는 안될지?

// [순서]5 - db 연결
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'bulletin',
  password: '1234',
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
router.get('/', function (request, response) {
  const query = 'SELECT * FROM boards'

  connection.query(query, (error, results) => {
    if (error) {
      console.error('MySql get요청 에러', error)
      response.status(500).send({ error: '데이터베이스 조회 실패' })
    } else {
      response.status(200).send(results)
    }
  })
})

// <detail one item GET>
router.get('/:boardId', function (request, response) {
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

// router.delete('/delete/:boardId', function (request, response) {
//   const deleteItem = request.params.boardId
// })

module.exports = router
