
import Vue from 'vue'
import PannelPage from '@/views/model/index.vue';
import vueDragable from '@/components/vueDragableCom/index.vue';
import { comTypes } from '@/api/dragableComType.js';
export const createVueDragable = (el,options)=>{
    const dragable = Vue.extend(vueDragable);
    const instance  = new dragable;
    instance.vm = instance.$mount();
    instance.vm.className = comTypes[options.type].className
    instance.vm.zIndex = comTypes[options.type].zIndex
    console.log(instance.vm.className)
   
    el.appendChild(instance.vm.$el);
    return instance.vm
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