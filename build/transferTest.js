const fs = require('fs')
const htmlModel = require('./htmlModel.js')
const rule = require('./rule.js')
fs.readFile(__dirname + "/build.json",'utf-8', function (err, data) {

    if (err) { throw err; }
    //console.log(JSON.stringify(data.toString()));
    let fileData = JSON.parse(data.toString())
 
    let rootData = JSON.parse(JSON.stringify(fileData.root))
    getHtml(rootData)
   
   

});
var getHtml = (data) => {
    data.forEach(el => {
        console.log(rule[el.type](htmlModel[el.type],el))
        if(el.children&&el.children.length>0){
            getHtml(el.children)
        }
    });
}
