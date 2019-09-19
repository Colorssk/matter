<template>
    <Modal v-model="show" v-if="show" width='80%' :height="560" class="container" @on-ok="ok" @on-cancel="cancel">
    
    
    
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
    
                        <Button class="ripple" @click="paintSCom">绘制</Button>
    
                        </Col>
    
                    </FormItem>
    
                </Row>
    
    
    
    
    
    
    
            </Form>
    
    
    
    
    
    
    
        </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </Modal>
</template>

<script>
import { createVueDragable } from '@/utils/util.js';
import $ from 'jQuery';
export default {
    name: 'medel',
    data() {
        return {
            show: true,
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
                sComHeight: '' // 小组件高度
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
        computedStyle() {
            return 'height:' + this.computedPannelHight + 'px;'
        },
        bgComputed(type) {
            return (type) => {
                return 'part-bg-style ' + type + '_com_style'
            }
        }
    },
    methods: {
        paintSCom() {
            if(this.pannelAction.sComWidth&&this.pannelAction.sComHeight){
                createVueDragable($('.com-container')[0], { 'type': this.nowType,width:this.pannelAction.sComWidth,height: this.pannelAction.sComHeight})
                this.nowType = ''
                this.sComShow = false
                this.$set(this.pannelAction,'sComWidth','')
                this.$set(this.pannelAction,'sComHeight','')
            }else{
                this.$Message.info('请输入宽高')
            }
            
        },
        ok() {
            this.show = false
        },
        cancel() {
            this.show = false
        },
        action(key, value) {
            this.computedPannelHight = value
        },
        // 添加组件
        addComToPaint(type) {
            console.log(this.nowType)
            
            if (this.nowType.length==0) {// 未有选中的小组件
                let filter = this.sComList.filter(el => {
                    return type == el
                })

                if (filter.length == 0) {
                    createVueDragable($('.com-container')[0], { 'type': type })
                    this.nowType = ''
                } else {
                    this.nowType = type
                    this.sComShow = true
                }
            } else {
                this.$Message.info('有组件未添加属性')
            }
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
</style>
