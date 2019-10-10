/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 15:29:21
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-10 14:40:19
 */
import { SCom } from '../../type/whiteList.js'
import  fs from 'fs';
// import { compose } from '@/utils/util.js'
const R = require('ramda');
export const util = {
    //处理一期数据:　加入表单：
    /*
        数据结构:
            {
                    "type": "form",
                    "model": "form",
                    "children": [
                        {
                            "type": "row",
                            "children": [
                                {
                                    "type": "input",
                                    "label": "测点编号",
                                    "model": "input1"
                                },
                                {
                                    "type": "select",
                                    "label": "测点编号",
                                    "model": "select1"
                                }
                            ]
                        },
                        {
                            "type": "row",
                            "children": [
                                {
                                    "type": "input",
                                    "label": "测点编号第二列",
                                    "model": "input2"
                                },
                                {
                                    "type": "select",
                                    "label": "测点编号第二列",
                                    "model": "select2"
                                },
                                {
                                    "type": "select",
                                    "label": "测点编号第二列",
                                    "model": "select3"
                                }
                            ]
                        }
                    ]
                }
    */
   /*
        @param:
            comList:(Array) 生成的所有组件列表；
            formData:(Array) 操作列表中切入form的组件id
   */
   handlerData(comList,formData){
       let comListTemp = comList.slice()
       let formDataTemp = formData.slice()
       var result
       formDataTemp.forEach(form => {
            if(form.children){
                form.children.forEach(com=>{
                    // if(com==){

                    // }
                })
            }
        });
       return result
   },
   // comList中根据小组件x轴和y轴的顺序从小到大排序
   sortSCom(comList){
      
    let comListTemp  = comList.slice()
    // console.log(util.filterSCom.call(this,this._.sortBy(comListTemp, ['y', 'x'])))
    let result = R.compose(util.filterSCom.bind(this),()=>{return this._.sortBy(comListTemp,['y', 'x'])})()
    //把排好序的小组件按照要求一次放入row和col
    // util.insertForm()
    return result
   },
   /**
    * 
    * @param {Array} forms :所有forms中小组件id 
    * @param {Array} SCom  :排序过滤之后的小组件
    *  
    */
   insertForm(forms,SCom){
       let resultFormsArray = forms.slice()
       var filterResult = null
       // let resultForm = {type:'form',model:null,children:[]}
       var index = 0
       resultFormsArray.forEach((form,formIndex)=>{
            form.children.forEach((id,idIndex)=>{
                SCom.forEach((com,comIndex)=>{
                    if(com.id == id){
                        filterResult = this._.find(resultFormsArray, function(o) { return o.model==form.model; });
                        if(!filterResult){
                            resultFormsArray.push({type:'form',model: form.model,children: []})
                        }
                        // 塞入逻辑
                        if(comIndex==0){
                            // 替换零号元素
                            resultFormsArray[formIndex].children[idIndex] = com       
                        }else{
                            // 第二个元素开始如果和之前的元素相同加入
                            if(SCom[comIndex].y==SCom[comIndex - 1].y){
                                resultFormsArray[formIndex].children[index]
                            }else{

                            }
                        }

                        filterResult = null
                    }
                })
            })
        })
   },
   // 筛选出小组件，并且包含在form列表中的小组件
   filterSCom(comList){
        let result =  []
        result = this._.filter(comList,(c)=>{
            return this._.find(SCom,function(o){
                return o == c.type
            })
        })
        return result
   },
   filterBCom(comList){
        let result =  []
        result = this._.filter(comList,(c)=>{
            return this._.find(SCom,function(o){
                return o != c.type
            })
        })
        return result
   },
   //分类 重写 filterSCom方法,以form.model为key值存储
   filterSComRe(comList){
        console.log(SCom)
        let forms = this.pannelAction.forms.slice()
        let tempResult =  []
        tempResult = this._.filter(comList,(c)=>{
            return this._.find(SCom,function(o){
                return o == c.type
            })
        })
        forms.forEach
        //增加逻辑，分装成二维数组，每个y轴相同的组件分装成一个数组
        return result
    },
   /**
    * 
    * @param {*} data 过滤之后的只有小组件的数组 使用情况:单个form数据
    * @return {Array}二维数组 一维：row 二维:col
    *  
    */
   splitefilterSComArray(data){
    let result = []
    result[0] = []
    result[0][0] = {type:data[0].type,label:data[0].label,model:data[0].model}
    var tempIndex = 0 
    for(var index = 1 ;index < data.length;index++){
        if(data[index].y == data[index - 1].y){
            result[tempIndex].push({type:data[index].type,label:data[index].label,model:data[index].model})
        }else{
            tempIndex++
            //创建一个一维数组
            result[tempIndex] = []
            result[tempIndex][0] = {type:data[index].type,label:data[index].label,model:data[index].model}
        }
    }
       return result
   },
   // 对filterSCom数据再次分装: 根据form再分类小组件
   /**
    * 
    * @param {Array} data :可用的小组件列表
    */
   filterSComFromForm(data){
        let tempForms = []
        tempForms = this.pannelAction.forms.slice()
        tempForms.forEach((form,formIndex)=>{
            form.children.forEach((com,comIndex)=>{
                data.forEach((el,_)=>{
                    if(com==el.id){
                        tempForms[formIndex].children[comIndex] = el
                        tempForms[formIndex].type = 'form'
                    }
                })
            })
        })
        return tempForms
   },
   //对filterSComFromForm方法返回的数据进行处理，返回特定某个form的小组件列表，提供给build函数使用
   filterSComFromFormfilter(data){

        let result = this._.filter(data,(o)=>{
            return o.model == this.formModel
        })
        console.log('返回debugger------')
        console.log(result[0].children)
        return result[0].children
   },
   //分批处理form表单.协调底层数据
   formsList(){//forms
    let resultFormsLists = [].concat(this.pannelAction.forms)
    resultFormsLists.forEach((form,formIndex)=>{
        resultFormsLists[formIndex] = {
            type: 'form',
            model: form.model,
            children: []
        }
    })
    return resultFormsLists
   },
   splitefilterSComArrayAddRow(data){
       let result = [].concat(data)
       result.forEach((el,index)=>{
        result.splice(index,1,{type:'row',children:result[index]})
        })
        return result
   },
   //filterSComFromForm
   buildFormList(comList){
    let filterSComFromForm = R.compose(util.filterSComFromForm.bind(this),util.filterSCom.bind(this),()=>{return this._.sortBy(comList,['y', 'x'])})()
    filterSComFromForm.forEach((el,index)=>{
        if(el.children){
            this.formModel = el.model
            if(this.formModel){
                filterSComFromForm[index].children = R.compose(util.splitefilterSComArrayAddRow.bind(this),util.splitefilterSComArray.bind(this),util.filterSComFromFormfilter.bind(this),util.filterSComFromForm.bind(this),util.filterSCom.bind(this),()=>{return this._.sortBy(comList,['y', 'x'])})()
            }
            this.formModel = null
        }
    })
    return filterSComFromForm
   },
   // 把小组件和大组件一起整合
   totalBuildFormList(comList){
        var result
        //处理过之后小组件集合
        let SbuildData = util.buildFormList.call(this,comList)
        // 初始数据的大组建集合
        //let tempTotalList = util.filterBCom.call(this,this.comContainerList.slice())
        console.log(this._.sortBy(this.comContainerList.slice()))
        debugger
        //对初始数据排序处理（剔除小组件之后的其他组建集合）
        //this._.sortBy(tempTotalList,['y', 'x'])
        result = {root: SbuildData}
        return result
   },
   

   
}