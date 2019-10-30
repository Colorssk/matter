/*
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-19 10:05:06
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-30 16:10:34
 */
const htmlModel = {
    "card":'<Card style="width:$width; left: $left;"></Card>',
    "input": '<Input v-model="$model" placeholder="请输入"/>',
    "select": '<Select v-model="$model"> <Option v-for="item in $models" :value="item.key" :key="item.key">{{ item.value }}</Option></Select>',
    "table": '<Table :columns="$column" :data="$data"></Table>',
    "form": '<Form :ref="$model" :model="$model"></Form>',
    "row": '<Row></Row>'
   }
    
module.exports = htmlModel