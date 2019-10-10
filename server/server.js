/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-08 15:37:46
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-09 10:17:04
 */
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//允许所有类型传参 
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var router = express.Router();


app.post('/jsonWrite', function(req, res, next) {

  // 获取参数
  var query = req.body;
  console.log("post请求：参数", JSON.stringify(query));
  data = JSON.stringify(query.data)
  const dirName = path.join(__dirname, '../','./build/testFile.json')
  fs.writeFile(dirName, data, function(err) {
      if (err) {
          throw err;
      }
      res.send('hello , world');
  });
});


const HOST = 'localhost'
const PORT = 3000
// http.createServer(app).listen(app.get('port'), function () {
//   console.log('Express server listening on port ' + app.get('port'))
// })
app.listen(PORT, HOST, () => {
  console.log(`server running on ${HOST}:${PORT}`)
})