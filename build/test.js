/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-14 17:45:55
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-14 17:45:55
 */
var data =[
    {a:'1',b:'2',c:true},
    {a:'1',b:'2'}
]
data.forEach(el=>{
    if(el.c){
        console.log('1')
    }else{
        console.log('2')
    }
})