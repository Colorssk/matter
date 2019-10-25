/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-24 09:57:37
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-25 15:11:16
 */
// /*
//  * @Descripttion: 
//  * @version: 
//  * @Author: Colorssk
//  * @Date: 2019-10-24 09:57:37
//  * @LastEditors: Colorssk
//  * @LastEditTime: 2019-10-25 09:30:55
//  */
// var a = [{
//     children: {
//         a: '5'
//     }
// }]
// var fn = (data)=>{
//     data[0] = {
//         children:{
//             a: 6
//         }
//     }
// }
// var fn2 = (data)=>{
//     data = {
//         a: 7
//     }
// }
// fn(a)
// fn2(a[0].children)
// // console.log(a);
// var b = {
//     c: 1,
//     d: 2
// }
// delete b.c

// var fn3 = (data) => {
//     return data.map(item=>{
//         if(item.id && item.id== '1')
//         {
//             item.children[0] = 'gai'
//         }else{
//             return
//         }
//         if(item.children&&item.children.length>0){
//             fn3(item.children)
//         }
//         return
//     }) 
// }
// var testData = [
//     {
//         id:'4',
//         children:[
//             {
//                 id:'1',
//                 children: ['a','b','c']
//             }
//         ]
//     }
//     ,{
//         id: '2',
//         children: ['a','b','c']
//     },
//     {
//         id: '3',
//         children: ['a','b']
//     }

// ]
// fn3(testData)
// console.log(JSON.stringify(testData))



var data = [
    {
        type: 'card',
        children:[
            {
                type: 'table',
                model: 'table2'
            },
            {
                type: 'form',
                model: 'model1',
                children:[
                    
                ]
            },
            {
                type: 'form',
                model: 'model1',
                children:[
                    
                ]
            }
        ]
    },
    {
        type: 'card',
        children:[
            {
                type: 'table',
                model: 'table1'
            },
            {
                type: 'form',
                model: 'model2',
                children:[
                    
                ]
            },
            {
                type: 'form',
                model: 'model2',
                children:[
                    
                ]
            }
        ]
    },
    {
        type: 'card',
        children: [
            {
                type: 'form',
                model: 'form1',
                children:[
                    
                ]
            },
            {
                type: 'form',
                model:'form1',
                children: [

                ]
            }
        ]
    }
]

var clearMUli = (data) => {
    var res = {}
    //如果包含form再去重
    if(data.findIndex((o)=>{
       return o.type == 'form'
    })> -1){
        data = data.filter(item=>!res[item.model] && (res[item.model] = true))
    }
    // 遍历递归
    return data.map(item=>{
        if(item.children && item.children.length > 0){
            item.children = clearMUli(item.children) // 局部赋值保持对应关系
        }
        return item
    })
}
clearMUli(data)
console.log(JSON.stringify(data))