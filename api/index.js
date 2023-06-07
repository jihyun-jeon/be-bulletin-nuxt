const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')

// Require API routes
const bulletin = require('./bulletin');
app.use('/bulletin',bulletin);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
// app.use('/', express.static('static')); // 파일 자체를 응답하는 것.

// [순서]5 - db 연결
/*
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port : "3306",
  user: "root",
  password:  "1234",
  database: "bulletin"
});

// Connect
connection.connect(function (err) {
  if (err) {
    console.error('mysql 연결 실페');
    throw err;
  }else{
    console.error('mysql 연결 성공');
  }
});
*/

app.listen(3000, () => {
  console.log('server start~!')
})

module.exports = app
