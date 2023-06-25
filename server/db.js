const mysql = require('mysql')
const config = require('../db_config.json')

const pool = mysql.createPool(config)

function getConnection(callback) {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error('mysql 연결 실패')
    } else {
      console.log('mysql 연결 성공')
      callback(conn)
    }
  })
}

module.exports = getConnection

/*
Connection Pool을 쓴 이유
:기존엔 mysql.createConnection()으로 connection을 연결한 후 계속 유지되도록 처리하였는데, api를 기능별로 모듈화 하려고 하니 db 연결하는 connection을 모듈화 된 파일별로 또 연결시켜야 됐다.
: 이 문제를 해결하기 위해 connection pool을 만들어 놨다가 필요한 곳에 가져다 사용하는 식으로 변경함.

데이터베이스에 연결된 Connection을 미리 만들어 둔후 Pool에 보관하였다가 필요할 때
Pool에서 Connection을 가져다 사용한 후, 다시 Pool에 반환하는 기법.
기존처럼 필요할때 마다 Connection을 생성하고 닫지 않아도 되기 때문에 어플리케이션의 성능향상 또한 기대할 수 있습니다.
https://techbless.github.io/2020/01/17/Node-js%EC%97%90%EC%84%9C-Mysql-Connection-Pool-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0/
*/
