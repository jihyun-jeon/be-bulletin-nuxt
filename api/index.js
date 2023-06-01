const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// [순서]5
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

 app.listen(3000,()=>{
  console.log("server start~!")
 })


// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome  main page" });
});

// detail route
app.get("/detail", (req, res) => {
  res.json({ message: "Welcome  detail page" });
});
