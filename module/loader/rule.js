/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-15 14:07:03
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-29 17:54:20
 */
const rule = {
    "table": (str,param) => {
        // "table": '<Table :columns="$column" :data="$data"></Table>'
        str = str.replace('$column',param.column).replace('$data',param.data);
        return str
    },
    "input": (str,param) => {
        str = str.replace(/\$model/ig,param.model);
        return str
    },
    "select": (str,param) => {
        str = str.replace(/\$model/ig,param.model);
        return str
    },
    "form": (str,param) => {
        str = str.replace(/\$model/ig,param.model);
        return str
    },
    "card": (str,param) => {
        // <Card style="width:$width; left: $left;"></Card>
        str = str.replace('$top',param.attribute.top).replace('$left',param.attribute.left);
        return str
    },
    "row": (str) => {
        return str
    }

}
module.exports = rule