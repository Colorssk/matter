/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-19 11:05:12
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-30 09:18:35
 */
const fs = require('fs')
const htmlModel = require('./htmlModel.js')
const jsModel = require('./jsModel.js')
const rule = require('./rule.js')
var str = ''
//过滤文本中的特殊字符
var filterSign = (st)=>{
    st = st.replace(/(\\|\\r|\\n|\\r\\n)/ig,'')
    return st
}
/**
 * 
 * @param {*} fileName 
 * @param {*} 回掉执行文件的压入 
 */
var trans = (fileName,fn,fn2)=>{
    fs.readFile(__dirname + "/"+fileName,'utf-8', (err, data) => {
        
        if (err) { console.log('报错了---------------'); throw err; }
        //console.log(JSON.stringify(data.toString()));
        let fileData = JSON.parse(data.toString())
        
        let rootData = JSON.parse(JSON.stringify(fileData.root))
        getHtml(rootData)
        //getJs(rootData)
        str = filterSign('<template><div>'+String(str)+'</div></template>')
        fn(str,fn2)
    });
}
var getHtml = (data) => {
    let tempData
    data.forEach(el => {
        
        if((/\$children/).test(str)){// 注入子节点
            // 如果植入的节点也包含子节点
            if(el.children&&el.children.length>0){
                tempData = insetSign(rule[el.type](htmlModel[el.type],el)+'\r\n',el.children.length,el.type=='row')
                str = str.replace('$children',tempData)
            }else{
                str = str.replace('$children',rule[el.type](htmlModel[el.type],el)+'\r\n')
            }
            
            // console.log(1)
            // console.log(rule[el.type](htmlModel[el.type],el))
            // console.log(str)
        }else{//无需要插入的片段
            if(el.children&&el.children.length>0){// 有子节点：植入标识
                
                str += insetSign(rule[el.type](htmlModel[el.type],el)+'\r\n',el.children.length,el.type=='row')
                // console.log(2)
                // console.log(str)
              }else{//无子节点 叶子结点
                str += rule[el.type](htmlModel[el.type],el)+'\r\n'
                // console.log(3)
                // console.log(str)
              }
            
        }
        if(el.children&&el.children.length>0){
            getHtml(el.children)
        }
    });
}
var insetSign = (elData,length,flag=false) => {
    let totalSinStr=''
    let result
    if(flag){//标签是row标签
        for(let i = 0;i<length;i++){
            totalSinStr += '<Col :span="'+parseInt(24/length)+'">$children</Col>' 
        }
        result = elData.replace('\>\<',`>${totalSinStr.trim()}<`);
    }else{
        for(let i = 0;i<length;i++){
            totalSinStr += '$children' 
        }
        result = elData.replace('\>\<',`>${totalSinStr.trim()}<`);
        }
    
    return result
}
// loader处理js代码
var transJs = (JSFileName,fn) => {
    console.log('1233333333333333333333333333333333')
    fs.readFile(__dirname + "/"+JSFileName,'utf-8', (err, data) => {
        
        if (err) { console.log('报错了---------------'); throw err; }
        //console.log(JSON.stringify(data.toString()));
        let fileData = JSON.parse(data.toString())
        // {"form":{"form1":["q","w"],"form2":["e","r"]},"table":["a","b"],"select":[]}
        let forms  = JSON.parse(JSON.stringify(fileData.form))
        let table = JSON.parse(JSON.stringify(fileData.table))
        let select = JSON.parse(JSON.stringify(fileData.select))
        
        var formStr = ''
        Object.keys(forms).forEach(key=>{
            formStr += key + ':{' 
            var tempdata = ''
            forms[key].forEach(el=>{
                tempdata += el + ':null,'    
            })
            formStr += tempdata + '},'
        })

        var tableStr = ''
        table.forEach((el,index)=>{
            if(index % 2==0){
                tableStr += el + ': [],' + table[index+1] + ':[],'
            }
        })

        var selectStr = ''
        select.forEach(el => {
            selectStr += el + 's:null,'
        });
        var totalStr = formStr + tableStr + selectStr
        var jsStr = jsModel.replace('$data',totalStr).replace('$methods','')
        fn(jsStr)
    });
}
// trans()
var tempdata = filterSign('Card style=\ "width:20; left: 20;\">\r\n')
console.log(tempdata)
var util = {
    trans,
    transJs
}
module.exports = util
