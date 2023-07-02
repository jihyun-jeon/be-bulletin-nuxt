const { Router } = require('express')
const { COUNTITEM } = require('../constant')
const getConnection = require('./db')

const router = Router() // router 객체는 라우팅 로직을 그룹화하여 분리합니다.

// <home all GET>
router.get('/get', function (request, response) {
  const { page, size } = request.query

  // SELECT * FROM boards LIMIT <페이지당 자료 개수> OFFSET <몇번째 row부터 출력할 지. (1번째 row면 0)>
  const query = `SELECT * FROM boards ORDER BY id DESC LIMIT ${size}  OFFSET ${
    (page - 1) * COUNTITEM
  };` // offset 0 10 20
  const countQuery = 'SELECT count(*) as total FROM boards'

  getConnection((conn) => {
    const sendData = {}

    try {
      conn.query(query, (err, result1) => {
        if (err) {
          console.error('err', err)
          response.status(500).send({ error: '데이터베이스 조회 실패' })
          conn.release()
        } else {
          sendData.data = result1

          conn.query(countQuery, (err, result2) => {
            if (err) {
              console.error('err', err)
              response.status(500).send({ error: '데이터베이스 조회 실패' })
            } else {
              sendData.total = result2[0].total
              response.status(200).send(sendData)
            }
          })
          conn.release()
        }
      })
    } catch (err) {
      response.status(500).send({ error: '데이터베이스 조회 실패' })
      conn.release()
    }
  })
})

// < Detail - one item GET>
router.get('/get/:boardId', function (request, response) {
  const itemId = request.params.boardId
  const query = `SELECT * FROM boards WHERE id = ${itemId}`

  getConnection((conn) => {
    try {
      conn.query(query, (err, results) => {
        if (err) {
          console.error('error', err)
          response.status(500).send({ error: '데이터베이스 조회 실패' })
        } else {
          response.status(200).send(results)
        }
      })
      conn.release()
    } catch (err) {
      response.status(500).send({ error: '데이터베이스 조회 실패' })
      conn.release()
    }
  })
})

// < Detail - one item POST>
// [TODO] 문서 보기 https://www.npmjs.com/package/mysql#escaping-query-values
// Escaping query values
router.post('/post', function (request, response) {
  const { user } = request
  const postData = request.body
  const selectQuery = 'select * from users where email = ?'
  const insertQuery = `insert into boards set ?`

  getConnection((conn) => {
    try {
      // <user정보 조회하여 id값 추출>
      conn.query(selectQuery, [user], (err, results) => {
        if (err) {
          console.error('err', err)
          response.status(500).send({ error: '데이터베이스 조회 실패' })
          conn.release()
        } else {
          const { id, nickname } = results[0]
          // <user id값 담아서 post요청>
          const postData2 = { ...postData, userId: id, nickname }
          conn.query(insertQuery, [postData2], (err, results) => {
            if (err) {
              console.error('err', err)
              response.status(500).send({ error: '데이터베이스 생성 실패' })
            } else {
              response.status(200).send({ message: 'post success' })
            }
          })
          conn.release()
        }
      })
    } catch (err) {
      response.status(500).send({ error: '데이터베이스 조회 실패' })
      conn.release()
    }
  })
})

// < Detail - one item DELETE>
router.delete('/delete/:itemId', function (request, response) {
  const { user } = request // jh1@naver.com
  const { itemId } = request.params

  const selectQuery = `select title from boards where id = ${itemId}
  and userId in (SELECT id FROM  users where users.email ='${user}')`

  const deleteQuery = `DELETE FROM boards WHERE id = ${itemId}`

  getConnection((conn) => {
    // select 으로 작성자가 맞는지 확인
    conn.query(selectQuery, (err, results) => {
      if (err) {
        console.error('err', err)
        response.status(500).send({ error: '데이터베이스 조회 실패' })
        conn.release()
        return
      }

      if (!results.length) {
        response.status(403).send({ message: '삭제 권한 없음' })
        conn.release()
        return
      }

      conn.query(deleteQuery, (err, results) => {
        if (err) {
          console.error('err', err)
          response.status(500).send({ error: '데이터베이스 삭제 실패' })
        } else {
          console.log('삭제 성공!~')
          response.status(200).send({ message: 'delete success' })
        }
      })
      conn.release()
    })
  })
})

// < Detail - one item PATCH>
router.patch('/patch/:id', function (request, response) {
  const { user } = request // jh1@naver.com
  const boardId = request.params.id
  const updateData = request.body

  const query = 'UPDATE boards SET ? where id = ?'
  const selectQuery = `select title from boards where id = ${boardId}
  and userId in (SELECT id FROM  users where users.email ='${user}')`

  getConnection((conn) => {
    conn.query(selectQuery, (err, results) => {
      if (err) {
        response.status(500).send({ error: '데이터베이스 조회 실패' })
        conn.release()
        return
      }
      if (!results.length) {
        response.status(403).send({ message: '수정 권한 없음' })
        conn.release()
        return
      }

      conn.query(query, [updateData, boardId], (err, results) => {
        if (err) {
          console.error('MySql item patch 요청 에러', err)
          response.status(500).send({ error: '데이터베이스 수정 실패' })
        } else {
          console.log('수정 성공!~')
          response.status(200).send({ message: 'patch success' })
        }
      })
      conn.release()
    })
  })
})

// < Detail - one item hit count>
router.post('/item-click', function (request, response) {
  const { boardId } = request.body
  const selectQuery = 'select hit from boards where id = ?'

  getConnection((conn) => {
    try {
      conn.query(selectQuery, [boardId], (err, results) => {
        if (err) {
          response.status(500).send({ error: '데이터베이스 조회 실패' })
          conn.release()
          return
        }

        let { hit } = results[0]

        const updateQuery = `update boards set hit = ? where id = ?`
        conn.query(updateQuery, [++hit, boardId], (err, results) => {
          if (err) {
            console.error('err', err)
            response.status(500).send({ error: '데이터베이스 조회 실패' })
          }

          response.status(200).send({ message: 'hit update success' })
        })
        conn.release()
      })
    } catch (err) {
      response.status(500).send({ error: '데이터베이스 조회 실패' })
      conn.release()
    }
  })
})

module.exports = router
