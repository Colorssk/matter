/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 15:29:21
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-24 17:19:46
 */
import { SCom , attributesWhiteList, BCom } from '../../type/whiteList.js'
import { Input } from 'iview';
// import { compose } from '@/utils/util.js'
const R = require('ramda');
var result = {form:{},table:[],select:[]}
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
   //筛选出大组件(非form的组件)
   filterBCom(comList){
        let result =  []
        result = this._.filter(comList,(c)=>{
            return this._.find(BCom,function(o){
                return o == c.type
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
   // 把小组件和大组件一起整合  bug 第一步：大组件和小组件为并列(漏删选)
   totalBuildFormList(comList){
        var result
        //处理过之后小组件集合
        let SbuildData = util.buildFormList.call(this,comList)
        // 初始数据的大组建集合
        //let tempTotalList = util.filterBCom.call(this,this.comContainerList.slice())
        //大组件列表
        var Blists = util.filterBCom.call(this,comList)
        var BObj = {}
        Blists.forEach(el=>{//大组件
            comList.forEach(item=>{//所有组件
                if(item.id!=el.id){//过滤到自身
                    //所有组件中如果包含在BLists中的就直接生成对象数组
                    //大组件阈值:x:(el.x,el.x+el.width);y:(el.y,el.y+el.height)
                    //小组件阈值:x:(item.x,item.x+item.width);y:(item.y,item.y+item.height)
                    if(Number(item.x) > Number(el.x) && Number(item.x) + Number(item.width) < Number(el.x)+ Number(el.width) && Number(item.y) > Number(el.y) && Number(item.y) + Number(item.height) < Number(el.y) + Number(el.height)){//组件包含在当前大组件的内部
                        if(!BObj.hasOwnProperty(el.id)){//第一次塞
                            BObj[el.id]  = []
                        }
                        BObj[el.id].push(item)
                    }
                }
            })
        })
        console.log(BObj,'第一阶段数据')
        //以上BObj: {id1:[B1组件，B2组件,B3组件,A2组件],id2(A2组件):[B3组件]}
        //第二部：
        var BObj2 = []
        //转化成:[{A1组件,children:[B1组件，B2组件,,B3组件,A2组件]}{A2组件，children:[B3组件]}]
        Object.keys(BObj).forEach(key=>{
            comList.forEach(item=>{
                if(item.id == key){
                    //包含attribute属性
                    if(util.hasAttribute.call(this,item)){
                        BObj2.push({
                            "id":item.id,
                            "type": item.type,
                            "attribute": {
                                "left": item.x,
                                "top": item.y
                            },
                            "children": BObj[key].slice()
                        })
                        console.log(BObj[key].slice(),'为空的数据')
                    }else{
                        //一般类型   目前暂时只有两种大组件类型(card和table) colorssk
                        BObj2.push({
                            "id": item.id,
                            "type": item.type,
                            "data": "data1",
                            "column": "column1"
                        })
                        console.log(item,'此处新增组件之后需要修改')
                    }
                    
                    
                }
            })
        })
         //中转：删除冗余数据：例如二步骤的数据是[{A1组件,children:[B1组件，B2组件,B3组件，A2组件]}{A2组件，children:[B3组件]}]
        //转化为: [{A1组件,children:[B1组件，B2组件，A2组件]}{A2组件，children:[B3组件]}]
        var tempBObj2 = BObj2.slice()//临时数据
        BObj2.forEach((el,index)=>{
            if(el.children && el.children.length > 0){
                el.children.forEach(item=>{
                    if(this._.findIndex(BCom,o=>{
                        return o == item.type
                    }) > -1){//嵌套的对象是大组件
                        var tempcurItem
                        comList.forEach(com=>{
                            if(com.id == item.id){
                                tempcurItem = com
                            }
                        })
                        var innerItem = []
                        //查找大组件内部的子元素
                        comList.forEach(com=>{//item,el(外层)=>(tempcurItem)(外层)，com(内层)
                            if(Number(com.x) > Number(tempcurItem.x) && Number(com.x) + Number(com.width) < Number(tempcurItem.x)+ Number(tempcurItem.width) && Number(com.y) > Number(tempcurItem.y) && Number(com.y) + Number(com.height) < Number(tempcurItem.y) + Number(tempcurItem.height)){//在当前元素内部的子元素
                                innerItem.push(com.id)
                            }
                        })
                        //过滤children中重复组建例如B3组件
                        tempBObj2[index].children.forEach((el,i)=>{
                            if(this._.findIndex(innerItem,o=>{
                                return o == el.id
                            }) > -1){
                                tempBObj2[index].children.splice(i, 1)
                            }
                        })
                        
                    }
                })
            }
        })
        BObj2 = tempBObj2
        console.log(BObj2.slice(),'第二阶段数据')
        //第三部所有小组件替换成序列化之后的form数据  SbuildData
        // 转化成: [{A1组件,children:[form1对象，form1对象,A2组件]}{A2组件，children:[form2对象]}]
        BObj2.forEach((el,i)=>{
            if(Array.isArray(el.children) && el.children.length > 0){
                el.children.forEach((child, index)=>{
                    if(this._.findIndex(SCom,o=>{return o == child.type})>-1){//小组件
                        BObj2[i].children[index] = util.getFormObj(child.model,SbuildData)
                    }
                })
            }
        })
        console.log(BObj2,'第三阶段数据')
        //第四部： 被嵌套的大组件置换展示具体置换内容   替换还是有bug
        //转化成:[{A1组件,children:[form1对象,for1对象，form2对象]},{}]
        for(var i = 0; i < BObj2.length; i++){
            if(BObj2[i].children && BObj2[i].children.length>0){
                BObj2[i].children.forEach((el,index)=>{
                    if(i+1 < BObj2.length){//处理边界情况
                        for(var j = i + 1;j< BObj2.length;j++){//此处可以取到最后一个元素
                            if(this._.findIndex(BCom,o=>{return o == el.type}) > -1 &&BObj2[j].id == BObj2[i].children[index].id && BObj2[j].children){//大组件的情况
                                //替换
                                BObj2[i].children[index] = BObj2[j]
                                //数组降维
                                //BObj2[i].children = Array.prototype.concat.apply([],BObj2[i].children)
                                //需要置空的大组建标记
                                BObj2[j].isAddFlag = true
                            }
                        }
                    }
                })
            }
        }
        console.log(BObj2,'第四阶段数据')
        //第五步：
        //转化成 [{A1组件,children:[form1对象,for1对象，form2对象]}]
        BObj2.forEach((el,index)=>{
            if(el.isAddFlag){   
                BObj2.splice(index,1)   
            }
        })
        //此处去重不干净:
        console.log('去重之前')
        console.log(this._.cloneDeep(BObj2))
        debugger
        let tempClearData = this._.cloneDeep(BObj2)
        tempClearData.forEach((el,index,self)=>{
            if(el.type == 'form'){
                util.clearFormData.call(this,tempClearData)
            }
            if(tempClearData[index].children && tempClearData[index].children.length > 0){
                debugger
                tempClearData[index].children.forEach((_,ind)=>{
                    if(tempClearData[index].children[ind] && tempClearData[index].children[ind].type && tempClearData[index].children[ind].type == 'form'){
                        debugger
                        tempClearData[index].children = util.clearFormData.call(this,tempClearData[index].children)
                    }
                })
            }
        })
        BObj2 = tempClearData
        //util.clearMUli.call(this,BObj2)
        console.log('去重之后')
        console.log(BObj2)

        console.log(BObj2,'第五阶段数据')
        //对初始数据排序处理（剔除小组件之后的其他组建集合）
        //this._.sortBy(tempTotalList,['y', 'x'])
        result = {root: BObj2}
        return result
   },
   //判断是否包含attribute属性
   hasAttribute(item){
       let index =  this._.findIndex(attributesWhiteList, o=>{return o == item.type});
       if(index == -1){
           return false
       }else{
           return true
       }
   },
   // 返回包含某组件的form对象
   /**
    * 
    * @param {String} model :小组件model
    * @param {Array} formsList ： 序列化之后的forms数组
    */
   getFormObj(model,formsList){
    var result = {}
    formsList.forEach(form=>{
        if(form.children.length>0){
            form.children.forEach(row=>{
                if(row.children.length>0){
                    row.children.forEach(col=>{
                        if(col.model==model){
                            result = form
                        }
                    })
                }
            })
        }
    })
    return result
   },
   // 获取js序列化数据
   /**
    * 
    * @param {Array} root: html序列化之后的数据.root 
    */
   getJSLists(root){
       debugger
        //slelect 存储options数组
        root.forEach(el=>{
            if(el.type!='form'){
                switch(el.type){
                    case 'table':
                        Array.prototype.push.call(result.table,...[el.data,el.column]);
                        break;
                    case 'select':
                        Array.prototype.push.call(result.select,...[el.model]);
                        break;
                }
                if(el.children && el.children.length>0){
                    util.getJSLists.call(this,el.children)
                }
            }else{
                //如果类型是form就把数据一次性加载进去
                if(!result.form[el.model]){
                    result.form[el.model] = []
                }
                el.children.forEach(row => {
                    row.children.forEach(col=>{
                        result.form[el.model].push(col.model)
                    })
                });
            }
            
        })
        return result
   },
   clearMUli(data,ind){
       data.forEach((_,index)=>{
        if(data[index].children&&data[index].children.length>0){
            if(this._.findIndex(data,o=>{
                return o.type=='form'
            })>-1){
                // clear data
                debugger
                util.clearFormData.call(this,data,ind)
            }else{
                console.log(this._.findIndex(data,o=>{
                    debugger
                    return o.type=='form'
                }))
                debugger
                util.clearMUli.call(this,data,index)
            }
           }
       })
       debugger
   },
   clearFormData(data){

       if(Array.isArray(data)){
        var obj = {};
            data = data.reduce(function(item, next) {
            obj[next.model] ? '' : obj[next.model] = true && item.push(next);
            return item;
        }, []);
       }
       debugger
       return data
   }
}