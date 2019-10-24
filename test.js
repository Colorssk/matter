/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-24 09:57:37
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-24 11:14:57
 */
var a = [{
    children: {
        a: '5'
    }
}]
var fn = (data)=>{
    data[0] = {
        children:{
            a: 6
        }
    }
}
var fn2 = (data)=>{
    data = {
        a: 7
    }
}
fn(a)
fn2(a[0].children)
// console.log(a);
var b = {
    c: 1,
    d: 2
}
delete b.c
console.log(b)