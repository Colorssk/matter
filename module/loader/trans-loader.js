/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-15 13:57:13
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-16 17:22:25
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
        console.log(options.filename,'22222222222222222222222222')
        var fnHtml = data=>{
            fs.writeFile('./store.vue',data,{encoding:'utf8'}, (err)=>{//此处的文件名需要可配置
                if (err) {
                    
                    throw err;
                    
                }
               cb(null,source)
            })   
        }
        trans(options.filename,fnHtml)//序列化之后的数据操作
        
        
    }else{
        //cb也是一个异步所以可以并列调用
        // cb(null,`/**${options.text}**/${source}`)
        cb(null,source)
    }
    // cb(null,source)
    return source
}
module.exports = loader