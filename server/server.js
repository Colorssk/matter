/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-08 15:37:46
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-31 09:41:24
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


// app.post('/jsonWrite', function(req, res, next) {

//   // 获取参数
//   var query = req.body;
//   console.log("post请求：参数", JSON.stringify(query));
//   data = JSON.stringify(query.data)
//   const dirName = path.join(__dirname, '../','./build/testFile.json')
//   fs.writeFile(dirName, data, function(err) {
//       if (err) {
//           throw err;
//       }
//       res.send('hello , world');
//   });
// });

// app.get('/getTestjson', function(req, res, next) {

//   // 获取参数
//   var query = req.body;
//   console.log("post请求：参数", JSON.stringify(query));
//   data = JSON.stringify(query.data)
//   const dirName = path.join(__dirname, '../','./build/fortestHtmlFile.json')
//   fs.readFile(dirName,'utf-8', function (err, data) {

//       if (err) { throw err; }
//       res.send(JSON.parse(data));
      
    

//   });
// });
// html模板写入
app.post('/testHtmljsonWrite', function(req, res, next) {
  // 获取参数
  var query = req.body;
  console.log("post请求：参数", JSON.stringify(query));
  data = JSON.stringify(query.data)
  const dirName = path.join(__dirname, '../','./module/loader/fortestHtmlFile.json')
  fs.writeFile(dirName, data, function(err) {
      if (err) {
          throw err;
      }
      res.send('hello , world');
  });
});
// js模板写入
app.post('/testJSjsonWrite', function(req, res, next) {
  // 获取参数
  var query = req.body;
  console.log("post请求：参数", JSON.stringify(query));
  data = JSON.stringify(query.data)
  const dirName = path.join(__dirname, '../','./module/loader/fortestJSFile.json')
  fs.writeFile(dirName, data, function(err) {
      if (err) {
          throw err;
      }
      res.send('hello , world');
  });
});
// 命令行参数获取
app.get('/getProcessArg', function(req, res, next) {

  // 获取参数
  var query = process.argv[(process.argv.length-1)]
  console.log(query,'server-------------------------------------')
  res.send(query)
});
const HOST = 'localhost'
const PORT = 3000
// http.createServer(app).listen(app.get('port'), function () {
//   console.log('Express server listening on port ' + app.get('port'))
// })
app.listen(PORT, HOST, () => {
  console.log(`server running on ${HOST}:${PORT}`)
})