const express = require('express')
const app = express()
const mysql = require('mysql2')

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
})

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')
})

// 1.요청 바디 : 페이지 번호, 페이지 수
app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.page_size) || 10

  // 2.MySQL에서 데이터 10개만 검색
  const startIndex = (page - 1) * pageSize
  const sql = `SELECT * FROM items LIMIT ${startIndex}, ${pageSize}`

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Failed to fetch items from MySQL:', err)
      res.status(500).json({ error: 'Failed to fetch items' })
      return
    }

    // 3. db조회한 결과, 10개 데이터 변수에 저장
    const pageItems = results

    // 4. MySQL에서 전체 아이템 수 조회
    const countSql = 'SELECT COUNT(*) as count FROM items'
    connection.query(countSql, (err, countResult) => {
      if (err) {
        console.error('Failed to fetch total item count from MySQL:', err)
        res.status(500).json({ error: 'Failed to fetch total item count' })
        return
      }

      const totalItems = countResult[0].count

      // 5. API 응답 반환
      res.json({
        page: page,
        page_size: pageSize,
        total_items: totalItems,
        data: pageItems,
      })
    })
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
