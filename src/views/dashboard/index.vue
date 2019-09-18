<template>
    <div>
        <ul ref="parent" style="width:300px;">
            <li class="myli" v-for="(item,index) in list" :id="item.id" draggable="true" @dragstart="dragstart($event)" @dragover="dragover($event)" @drop="drop($event)"><span>123</span>{{item.name}}</li>
            <li style="clear:both"></li>
        </ul>
        <Button type="primary" @click="showPannel">调出面板</Button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pannel from '../model/index.vue'
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    data() {
        return {
            pannelShow: false,
            list: [{ id: 1, name: "乖" }, { id: 2, name: "不乖" }, { id: 3, name: "任性" }, { id: 4, name: "高兴" }],
            moveDom: "",
            startX: 0,
            changeDom: "",
            endX: 0,
        }

    },
    components: {
        Pannel
    },
    methods: {
        showPannel() {
          this.$addPannel();
        },
        dragstart(e) {
            var eo = e || event;

            this.moveDom = eo.currentTarget;
            this.startX = eo.clientX;
            this.startY = eo.clientY;
            // eo.dataTransfer.effectAllowed = "copy" // 设置这个属性应该配合 eo.dataTransfer来使用
        },
        dragover(e) {
            var eo = e || event;
            eo.preventDefault();
            this.changeDom = eo.currentTarget;
            this.endX = eo.clientX;
            this.endY = eo.clientY;
            if (this.endX - this.startX >= 0) {
                this.$refs.parent.insertBefore(this.moveDom, this.changeDom.nextSibling);
            } else {
                this.$refs.parent.insertBefore(this.moveDom, this.changeDom)
            }
        },
        drop(e) {
            const that = this;
            var eo = e || event;
            eo.preventDefault();
            this.changeDom = eo.currentTarget;
            // eo.dataTransfer.dropEffect = "copy";   暂时不用
            this.endX = eo.clientX;
            if (this.endX - this.startX >= 0) {
                this.$refs.parent.insertBefore(this.moveDom, this.changeDom.nextSibling);
            } else {
                this.$refs.parent.insertBefore(this.moveDom, this.changeDom);
            }

            let domList = this.$refs.parent.childNodes; // 在前面html中设置id
            let arr = [];
            for (let i = 0; i < domList.length; i++) { // 取出各id
                if (domList[i].id) {
                    arr.push(domList[i].id)
                }
            }
            let newList = [];

            for (let v1 of arr.values()) { // 根据id 重新组合数据
                for (let v of that.list.values()) {
                    if (v1 == v.id) {
                        newList.push(v);
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
