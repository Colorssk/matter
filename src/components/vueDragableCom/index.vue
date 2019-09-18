<template>
     <vue-draggable-resizable :class="classComputed" :grid="[20,20]"  :z="zIndex">
    </vue-draggable-resizable>
</template>
<script>
export default {
    name: 'vueDragable',
    data(){
        return {
            className: '',
            zIndex: 99
        }
    },
    computed:{
        classComputed(){
            return this.className + '_com_style'
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "@/styles/vueDragable.scss";
</style>