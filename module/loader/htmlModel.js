/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-10-15 14:06:51
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-29 17:54:07
 */
const htmlModel = {
    "card":'<Card style="top:$top; left: $left;"></Card>',
    "input": '<Input v-model="$model" placeholder="请输入"/>',
    "select": '<Select v-model="$model"> <Option v-for="item in $models" :value="item.value" :key="item.key">{{ item.label }}</Option></Select>',
    "table": '<Table :columns="$column" :data="$data"></Table>',
    "form": '<Form :ref="$model" :model="$model"></Form>',
    "row": '<Row></Row>'
   }
    
module.exports = htmlModel