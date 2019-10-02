<template>
    <div>
        <vue-draggable-resizable v-if="show" :data-id="id" :class="classComputed" @contextmenu.native.prevent="rightClick($event)" @resizestop="onResizstop" @dragstop="onDragstop" :style="computedStyle" @click.native="closeIconShow()" :grid="[20,20]" :z="zIndex">
            <Icon class="icon-class-style" v-if="iconShow" @click="closeCom()" type="ios-close" />
        </vue-draggable-resizable>
        <div v-if="showMenu" class="rightClickmenu">
            <ul>
                <li v-for="(item,index) in $parent.pannelAction.forms" @click="addForm(item.model)">
                    {{item.model}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'jQuery';
export default {
    name: 'vueDragable',
    data() {
        return {
            className: '',
            showMenu:false,
            zIndex: 99,
            show: true,
            iconShow: false,
            small: false,
            width: 200,
            height: 200,
            id: 0,
            whiteList: ['input','select'],// 白名单
        }
    },
    computed: {
        classComputed() {
            return this.className + '_com_style'
        },
        computedStyle() {
            if (this.width !== 200 || this.height !== 200) {
                return 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px;'
            } else {
                return ''
            }

        }
    },
    mounted() {
        $(document).on('click', (e) => {
            if (e.target.className == 'com-container') {
                this.iconShow = false
            }
            // 点击隐藏右击弹窗
            this.showMenu = false
            $('.rightClickmenu').fadeOut();
        })
    },
    destroyed() {
        this.show = false
    },
    methods: {
        /*
            父节点数据结构:
                pannelAction:{
                    ...,
                    forms:[
                        {
                            model: 'model1',
                            children: [
                                'id1',
                                'id2',
                                ...
                            ]
                        }
                    ]
                }
        */
        addForm(nowModel){
           var addFlag = true
            let tempdata = this.$parent.pannelAction.forms.slice()
           
            tempdata.forEach((form,formIndex)=>{
                // 检验是否在forms列表中添加过数据
                if(form.children){
                    form.children.forEach(com => {
                        if(com == this.id){
                            addFlag = false
                        }
                    });
                }
                
                if(form.model == nowModel){
                    if(!this.$parent.pannelAction.forms[formIndex].children){
                        this.$parent.pannelAction.forms[formIndex].children = []
                    }
                    this.$parent.$nextTick(()=>{
                        if(addFlag){
                            this.$parent.pannelAction.forms[formIndex].children.push(this.id)
                        }else{
                            this.$Message.info('已经添加组件到form表单')
                        }
                         
                    })
                  
                    
                }
            })
        },
        //组建右击
        rightClick(e){
            let indexResult = this._.indexOf(this.whiteList, this.className);
            if(indexResult!=-1){// 是白名单中特殊组件(小组件),可以出现弹窗
                console.log(e)
                this.showMenu = true
               
                this.$nextTick(()=>{
                    $('.rightClickmenu').fadeIn(0)
                    $('.rightClickmenu').css(
                        {
                            left: e.clientX+5,
                            top: e.clientY+6
                        }
                    ) 
                })
                
                console.log('小组件')
            }else{
                console.log('大组件')
            }
            
        },
        onResizstop(left, top, width, height) {
            this.$parent.comContainerList.forEach((el, index) => {
                if (el.id == this.id) {
                    this.$parent.comContainerList[index].x = left
                    this.$parent.comContainerList[index].y = top
                    this.$parent.comContainerList[index].width = width
                    this.$parent.comContainerList[index].height = height
                }
            });

        },
        onDragstop(left,top){
            this.$parent.comContainerList.forEach((el, index) => {
                if (el.id == this.id) {
                    this.$parent.comContainerList[index].x = left
                    this.$parent.comContainerList[index].y = top
                }
            });
        },
        closeIconShow() {
            this.iconShow = true
        },
        closeCom() {
            // 删除父组件中组件列表中的数据
            this.$parent.deleteCom(this.id)
            // 删除forms列表中的数据
            this.$parent.pannelAction.forms.forEach((form,formIndex)=>{
                form.children.forEach((com,comIndex)=>{
                    if(com == this.id){
                        this.$parent.$nextTick(()=>{
                            this.$parent.pannelAction.forms[formIndex].children.splice(comIndex,1)
                        })
                        
                    }
                })
            })
            this.show = false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/vueDragable.scss";
.icon-class-style {
    position: absolute;
    font-size: 30px;
    right: -35px;
    top: -35px;
    cursor: pointer;
}
.rightClickmenu{
    display: none;
    min-width: 90px;
    text-align: center;
    color: rgba(0,0,0,0.85);
    background: #fff;
    position: fixed;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    border-radius: 5px;
    z-index: 999;
    height: auto;
}
.rightClickmenu li{
    height: 25px;
    list-style: none;
    cursor: pointer;
    line-height: 25px;
}
.rightClickmenu li:hover{
    background: rgba(23,100,232,0.09);
}
</style>