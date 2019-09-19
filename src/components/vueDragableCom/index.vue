<template>
    <vue-draggable-resizable v-if="show" :class="classComputed" :style="'width:'+width+'px; '+'height:'+height+'px;'" @click.native="closeIconShow()" :grid="[20,20]" :z="zIndex">
    
        <Icon class="icon-class-style" v-if="iconShow" @click="closeCom()" type="ios-close" />
    
    </vue-draggable-resizable>
</template>
<script>
import $ from 'jQuery';
export default {
    name: 'vueDragable',
    data() {
        return {
            className: '',
            zIndex: 99,
            show: true,
            iconShow: false,
            small: false,
            width: 200,
            height: 200,
        }
    },
    computed: {
        classComputed() {
            return this.className + '_com_style'
        }
    },
    mounted() {
        $(document).on('click',(e)=>{
            if(e.target.className=='com-container'){
                this.iconShow = false
            }
        })
    },
    destroyed() {
        this.show = false
    },
    methods:{
        closeIconShow(){
           this.iconShow = true
        },
        closeCom(){
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
    right:-35px;
    top: -35px;
    cursor:pointer;
}
</style>