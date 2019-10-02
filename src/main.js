import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import lodash from 'lodash';

import { addPannelCom } from '@/utils/util.js';
import vdr from 'vue-draggable-resizable-gorkys';
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.use(iView);
Vue.component('vue-draggable-resizable', vdr);

Vue.config.productionTip = false
Vue.prototype.$addPannel = addPannelCom
Vue.prototype._ = lodash

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
