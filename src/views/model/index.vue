<!--
 * @Descripttion: 
 * @version: 
 * @Author: Colorssk
 * @Date: 2019-09-16 10:26:48
 * @LastEditors: Colorssk
 * @LastEditTime: 2019-10-23 17:03:18
 -->
<template>
    <Modal v-model="show" v-if="show" width='80%' :height="560" class="container">
        <div class="paint-container">
            <div class="pannel-container" style="height: 560px; width: 500px ;overflow-x:hidden;overflow-y:scroll; position: relative; background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;">
                <div :style="computedStyle" class="com-container"> 
                    <!-- <vue-draggable-resizable class="card_com_style" :grid="[20,20]" :z="1">  
                        </vue-draggable-resizable>   
                        <vue-draggable-resizable class="table_com_style" :grid="[20,20]" :z="99">
                        </vue-draggable-resizable> -->
                </div>
            </div>
        </div>
        <!-- 右侧组件库 -->
        <div class="com-list">
            <ul class="com-ul-list-style">
                <li class="ul-li-style" v-for="(part,index) in parts" :key="index">   
                    <div class="part">
                        <div :class="bgComputed(part.type)" @click="addComToPaint(part.type)"></div>
                        <div class="part-info-style">{{part.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pannel-action-list">
            <Form :model="pannelAction" :label-width="80">
                <FormItem label="面板高度:">
                    <Row>
                        <Col span="11">
                        <Input v-model="pannelAction.actionPannnelHeight" placeholder="操作面板高度" style="width: 100px" />  
                        </Col>   
                        <Col span="3" :offset="5">
                        <Button type="primary" class="ripple" :ghost="true" size="small" @click="action('actionPannnelHeight',pannelAction.actionPannnelHeight)">应用</Button>   
                        </Col>
                    </Row>  
                </FormItem>
                <!-- 小组建属性面板 -->
                <Row v-if="sComShow" style="border: 1px dashed red; padding-top:20px;">
                    <FormItem label="组建属性:">
                        <Col :span="11">
                        <Input v-model="pannelAction.sComWidth" placeholder="小组件宽度" style="width: 100px" />
                        </Col>
                    </FormItem>
                    <FormItem label="">
                        <Col :span="11">
                        <Input v-model="pannelAction.sComHeight" placeholder="小组件高度" style="width: 100px" />
                        </Col>
                    </FormItem>
                    <FormItem label="">
                        <Col :span="11">
                        <Input v-model="pannelAction.label" placeholder="标签名" style="width: 100px" />
                        </Col>
                    </FormItem>
                    <FormItem label="">
                        <Col :span="11">
                        <Input v-model="pannelAction.model" placeholder="变量名" style="width: 100px" />
                        </Col>
                    </FormItem>
                    <FormItem label="">  
                        <Col :span="11">   
                        <Button class="ripple" @click="paintSCom">绘制</Button>
                        </Col>
                    </FormItem>
                </Row>
                <!-- form表单配置 -->
                <template v-if="pannelAction.forms.length>0">
                    <div v-for="(form,index) in pannelAction.forms" :key="index">
                        <Row style="border: 1px dashed red; padding-top:20px;">
                            <FormItem label="form列表:">
                                <Col :span="11">
                                <Input v-model="form.model" placeholder="变量名" style="width: 100px" />
                                </Col>
                            </FormItem>
                            <Icon type="md-close" style="font-size:18px;position:absolute;right:0px;top:0px; cursor:pointer" @click="deleteForm(index)"></Icon>
                            <div style="width: 240px;text-align: center;height: 30px;"  v-for="(com,comIndex) in form.children" :key="comIndex">
                                <span :class="{'style-red':ComComputedStyle(index,comIndex)}">{{com}}</span>
                            </div>
                        </Row>
                        
                    </div>
                    <Row>
                        <Col :span="11">   
                            <Button class="ripple" style="margin-left:73%; margin-top:10px;" @click="addFormlist">添加form</Button>
                        </Col>
                    </Row>
                </template>
                <template v-if="pannelAction.forms.length==0">
                    <div class="wait_logo_style" @click="addFormlist"></div>
                </template>
            </Form>
            <!-- table属性面板 -->
            <template v-if="currentTableInfo">
                <div style="width:248px;height:auto;border:1px dashed red; padding-top:20px;">
                    <Row style="padding-bottom:20px;">
                        <Col :span="11" >
                            <Input ref="tableData" v-model="currentTableInfo.data" data-id="tableData" id="tableData" placeholder="table(Data)">
                            </Input>
                        </Col>
                        <Col :span="11">
                            <Input ref="tableColumn" v-model="currentTableInfo.column" data-id="tableColumn" id="tableColumn" placeholder="table(Column)">
                            </Input>
                        </Col>
                        <Col :span="24">
                           <Button class="ripple" style="margin-left:38%; margin-top:10px;" @click="saveTableInfo">ok</Button>
                        </Col>
                    </Row>
                </div>
            </template>
        </div>
        <Progress v-if="progressShow" :percent="percent" status="active" />
        <div slot="footer"><Button type="primary" @click="ok">确定</Button><Button>取消</Button></div>
    </Modal>
</template>

<script>
import { createVueDragable } from '@/utils/util.js';
import { util } from './util.js';
import $ from 'jQuery';
export default {
    name: 'medel',
    data() {
        return {
            show: true,
            currentTableInfo: null,//属性面板中当前选中table值
            activeIndex: null,//forms列表中目前标红的id值
            comContainerList: [],//当前在画板上的所有元素
            progressShow: false,
            timer: null,
            percent: 0,
            sComShow: false, // 小组件属性显示
            nowType: '', //当前选中组件类型
            // 有操作属性的小组件列表
            sComList: [
                'input',
                'select'
            ],
            actionPannnelHeight: '560',
            pannelAction: {
                actionPannnelHeight: '', // 绘制面板高度
                sComWidth: '', // 小组件宽度
                sComHeight: '', // 小组件高度
                label: '', //标签名
                model: '', // 变量名
                forms: [], //表单列表
                tables: [], //table列表
            },
            computedPannelHight: 700,
            parts: [{
                    name: '表格',
                    type: 'table'
                },
                {
                    name: '卡片',
                    type: 'card'
                },
                {
                    name: '输入框',
                    type: 'input'
                },
                {
                    name: '选择框',
                    type: 'select'
                }
            ]
        }
    },
    computed: {
        ComComputedStyle(formIndex,comIndex){
            return (formIndex,comIndex)=>{
                return formIndex+'-'+comIndex == this.activeIndex ? true :false;
            }
        },
        computedStyle() {
            return 'height:' + this.computedPannelHight + 'px;'
        },
        bgComputed(type) {
            return (type) => {
                return 'part-bg-style ' + type + '_com_style'
            }
        }
    },
    mounted(){
         $(document).on('click', (e) => {
            // 获取到目前点击的元素
            if(e.target.dataset.id){
                // 选中小组件事件
                this.pannelAction.forms.forEach((form,formIndex)=>{
                    if(form.children){
                        form.children.forEach((com,comIndex)=>{
                            if(com == e.target.dataset.id){
                                this.activeIndex = `${formIndex}-${comIndex}`
                            }
                        })
                    }
                })
                // 选中table组件事件
                if(this.pannelAction.tables.length>0){
                    this.pannelAction.tables.forEach(el => {
                        
                        if(el.id == e.target.dataset.id){    
                            this.currentTableInfo = {
                                id: e.target.dataset.id,
                                data: el.data,
                                column: el.column
                            }
                        }
                    });
                }
            }else{
                //移除forms中所有标红
                this.activeIndex = null
                if($(e.target).closest('div')[0].dataset.id != 'tableData'&& $(e.target).closest('div')[0].dataset.id != 'tableColumn'){
                    this.currentTableInfo = null
                }
                //移除：table属性面板
                //this.currentTableInfo = null
            }
         })
    },
    watch:{
        percent(value){
            if(value==100){
                clearTimeout(this.timer)
                this.timer = null
                this.progressShow = false
                this.show = false
            }
        }
        
    },
    methods: {
        //存储table信息
        saveTableInfo(){
            this.pannelAction.tables.forEach((el,index) => {
                if(el.id == this.currentTableInfo.id){
                    let temp = this.pannelAction.tables
                    temp[index].data = this.currentTableInfo.data
                    temp[index].column = this.currentTableInfo.column
                    this.$set(this.pannelAction,'tables',[].concat([...temp]))
                }
            });
        },
        // 添加组件的其余逻辑
        /**
         * @param
         *  type: 添加组件类型,
         *  id: 生成组件id
         */
        addComLogic(type,id){
            if(type=='table'){
                //先加入属性列表
                this.pannelAction.tables.push({
                    id:id,
                    data: '',
                    column: ''
                })
            }
        },
        // 删除forms表单列表
        deleteForm(index){
            this.pannelAction.forms.splice(index,1);
        },
        // 添加forms表单列表
        addFormlist(){
            this.pannelAction.forms.push({model: 'form'+(Number(this.pannelAction.forms.length)+1),children:[]})
        },
        changeSrc(src){
            $('.wait_logo_style').attr('src',src)
        },
        // 父组件调用用来删除绘制区域的组件
        /*
        @param:
            id: 每个组件的唯一标识
        */
        deleteCom(id){
            this.comContainerList.forEach((el,index)=>{
                if(el.id == id){
                    this.comContainerList.splice(index,1)
                }
            })
        },
        genID(length){
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
            },
        paintSCom() {
            if(this.pannelAction.sComWidth&&this.pannelAction.sComHeight){
                let temporaryId = this.genID()
                createVueDragable($('.com-container')[0], { 'type': this.nowType,width:this.pannelAction.sComWidth,height: this.pannelAction.sComHeight,id:temporaryId,
                label:this.pannelAction.label,model:this.pannelAction.model,parent:this})
                this.comContainerList.push({id:temporaryId,type:this.nowType,width:this.pannelAction.sComWidth,height:this.pannelAction.sComHeight,x:0,y:0,label:this.pannelAction.label,model:this.pannelAction.model})


                this.nowType = ''
                this.sComShow = false
                this.$set(this.pannelAction,'sComWidth','')
                this.$set(this.pannelAction,'sComHeight','')
                this.$set(this.pannelAction,'label','')
                this.$set(this.pannelAction,'model','')
               
            }else{
                this.$Message.info('请输入宽高')
            }
            
        },
        ok() {
            //测试用:
            // this.$axios.get('/api/getTestjson').then(res=>{
            //     // alert(res)
            //     // res.data.pop()
            //     var result = util.totalBuildFormList.call(this,res.data)
            //     console.log(result)
            // }).catch(e=>{
            //     throw e
            // })



            //this.progressShow = true
            // 获取数据
            // console.log(this.comContainerList,123)
            // this.timer = setInterval(()=>{
            //     this.$nextTick(()=>{
            //         this.percent += 5
            //     })
                
            // },100);
            //
            // var result = [];//最终一期处理之后的数据
            // 处理1：制定元素放入form
            // console.log(util.sortSCom.call(this,this.comContainerList),223)
            //console.log(util.buildFormList.call(this,this.comContainerList),223)
            // var result = util.buildFormList.call(this,this.comContainerList)
            // 另加的table属性(data,column)//this.pannelAction.tables
            var tempOption = this._.cloneDeep(this.addAttr(this.comContainerList))
            // tempOption.push({
            //     id: '0',
            //     type:'card',
            //     x: 0,
            //     y: 0,
            //     width: 1000,
            //     height: 1000
            // })
            // this.$axios.post('/api/testHtmljsonWrite',{data:tempOption}).then(res=>{
            //     // alert(res)
            // }).catch(e=>{
            //     throw e
            // })
            var result = util.totalBuildFormList.call(this,tempOption)
            let temproot = this._.cloneDeep(result.root)
            console.log('分界线')
            // console.log(util.getJSLists.call(this,temproot))
            console.log(temproot,'123')
          
            


            // this.$axios.post('/api/jsonWrite',{data:result}).then(res=>{
            //     alert(res)
            // }).catch(e=>{
            //     throw e
            // })
        },
        addAttr(data){
            let cloneData = this._.cloneDeep(data)
            if(this.pannelAction.tables.length > 0){
                this.pannelAction.tables.forEach(el=>{
                    cloneData.forEach((item,index)=>{
                        if(el.id == item.id){
                            cloneData[index].data = el.data;
                            cloneData[index].column = el.column;
                        }
                    })
                })
            }
            return cloneData
        },
        cancel() {
            debugger
            //this.show = false
        },
        action(key, value) {
            this.computedPannelHight = value
        },
        // 添加组件
        addComToPaint(type) {
            if (this.nowType.length==0) {// 未有选中的小组件
                let filter = this.sComList.filter(el => {
                    return type == el
                })

                if (filter.length == 0) {
                    var temporaryId = this.genID()
                    createVueDragable($('.com-container')[0], { 'type': type,id:temporaryId,parent:this })
                    this.comContainerList.push({id:temporaryId,type:type,width:200,height:200,x:0,y:0})
                    this.nowType = ''
                } else {
                    this.nowType = type
                    this.sComShow = true
                }
            } else {
                this.$Message.info('有组件未添加属性')
            }
            // 添加组件其余业务逻辑
            this.addComLogic(type,temporaryId)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";
@import "@/styles/vueDragable.scss";
.paint-container {
    display: inline-block;
    width: 500px;
    height: 560px;
    overflow: hidden;
    position: relative;
    border: 1px solid grey;
}

.container>>>.ivu-modal-body {
    padding: 35px !important;
}

.com-list {
    width: 250px;
    height: 560px;
    float: right;
    border: 1px solid grey;
    background-color: #CFD8DC;
}

.pannel-action-list {
    width: 250px;
    height: 560px;
    float: right;
    border: 1px solid grey;
    overflow-y: scroll;
}

.size-style {
    width: 100px !important;
    height: 100px !important;
    background: black;
}

.com-container {
    width: 500px;
    height: 700px;
    overflow-x: hidden;
}

.part-bg-style {
    width: 200px;
    height: 150px;
    position: absolute;
    margin: 25px;
}

.part-bg-style:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.ul-li-style {
    width: 250px;
    height: 200px;
}

.part-info-style {
    width: 250px;
    position: absolute;
    margin-top: 180px;
    text-align: center;
    height: 50px;
}

.com-ul-list-style {
    width: 250px;
    height: 560px;
    overflow-y: scroll;
    position: relative;
    overflow-x: hidden;
}
.wait_logo_style{
    width: 248px;
    height: 200px;
    background-size: 100% 100%;
    cursor: pointer;
    background-image: url('../../assets/common_images/wait_add.gif');
}
.wait_logo_style:hover{ 
    background-image: url('../../assets/common_images/wait_add_hover.png');
}
.style-red{
    color: red;
}

</style>
