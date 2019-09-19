
import Vue from 'vue'
import PannelPage from '@/views/model/index.vue';
import vueDragable from '@/components/vueDragableCom/index.vue';
import { comTypes } from '@/api/dragableComType.js';
export const createVueDragable = (el,options)=>{
    var dragable = Vue.extend(vueDragable);
    var instance  = new dragable;
    instance.vm = instance.$mount();
    instance.vm.className = comTypes[options.type].className
    instance.vm.zIndex = comTypes[options.type].zIndex
    if(options.width&&options.height){
        instance.vm.width = options.width
        instance.vm.height = options.height
    }
    el.appendChild(instance.vm.$el);
}

export const addPannelCom = () => {
    const Pannel = Vue.extend(PannelPage);
    const instance = new Pannel;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);

    // instance.on('close',()=>{
    //     instance.vm.show = false
    // })
    return instance.vm;
}