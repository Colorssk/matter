/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-31 08:55:41
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-31 09:40:44
 */
const concurrently = require('concurrently');

let [ a1= '',a2= ''] = process.argv.filter((itm, idx) => idx > 1);

console.log(a1,'1------------------------')
console.log(a2,'2------------------------')
concurrently([
    `npm run dev -- -n ${ a2 }`,
    `npm run server -- -n ${ a2 }`
]);