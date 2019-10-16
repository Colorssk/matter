/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-15 13:57:13
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-15 18:02:21
 */
let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')
let trans = require('./transferTest')
function loader(source){
    this.cacheable(false)//打包的时候关掉缓存，表示每次都会重新打包
    //this.cacheable && this.cacheable()// 不穿参数表示默认打包
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {// 设置校验标准
        type:'object',
        properties:{
           filename:{
               type: 'string'
           }
        }
    }
    validateOptions(schema,options,'trans-loader')//到报错的时候会抛出最后一个参数字符串
    
    
    if(options.filename){//testFile.json
        this.addDependency(options.filename)// 加进依赖当这个loader依赖的文件变化的时候能够监听到实时打包
        // fs.readFile(options.filename,'utf8',function(err,data){// 异步调用所以下面不能用return要用cb
        //     //读取到数据之后，进行转码：
        //     trans
        // })
        let result = trans(options.filename)//序列化之后的数据操作
        fs.writeFile('./store.txt', JSON.stringify(result), function(err) {//此处的文件名需要可配置
            if (err) {
                console.log(err)
                throw err;
                
            }
            return source
        })
    
    }else{
        //cb也是一个异步所以可以并列调用
        // cb(null,`/**${options.text}**/${source}`)
        return source
    }
    // cb(null,source)
    return source
}
module.exports = loader