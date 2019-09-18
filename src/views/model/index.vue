<template>
    <Modal v-model="show" width='80%' :height="560" class="container">
    
        <div class="paint-container">
    
            <div class="pannel-container" style="height: 560px; width: 500px ;overflow-y:scroll; position: relative; background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;">
    
    
    
                <div :style="computedStyle" class="com-container">
    
    
    
                    <vue-draggable-resizable class="card_com_style" :grid="[20,20]" :z="1">
    
    
    
                    </vue-draggable-resizable>
    
    
    
                    <vue-draggable-resizable class="table_com_style" :grid="[20,20]" :z="99">
    
    
    
                    </vue-draggable-resizable>
    
    
    
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
            actionPannnelHeight: '560',
            pannelAction: {
                actionPannnelHeight: ''
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
        action(key, value) {
            this.computedPannelHight = value
        },
        // 添加组件
        addComToPaint(type){
            console.log();
            createVueDragable($('.com-container')[0],{'type':type})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";
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

.card_com_style {
    background-image: url("../../assets/components_images/card.png");
    background-size: 100% 100%;
}

.table_com_style {
    background-image: url("../../assets/components_images/table.png");
    background-size: 100% 100%;
}

.com-container {
    width: 100%;
    height: 700px;
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
.com-ul-list-style{
    width:250px;
    height:560px;
    overflow-y:scroll;
    position:relative;
    overflow-x:hidden;
}
</style>
