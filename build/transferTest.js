/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-19 11:05:12
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-09-19 11:05:12
 */
const fs = require('fs')
const htmlModel = require('./htmlModel.js')
const rule = require('./rule.js')
var str = ''
fs.readFile(__dirname + "/build1.json",'utf-8', function (err, data) {

    if (err) { throw err; }
    //console.log(JSON.stringify(data.toString()));
    let fileData = JSON.parse(data.toString())
 
    let rootData = JSON.parse(JSON.stringify(fileData.root))
    getHtml(rootData)
    getJs(rootData)
    console.log(str)
    
   

});
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
var getJs = (data) => {
    
}
