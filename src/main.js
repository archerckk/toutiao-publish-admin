import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载 element 组件库
import ElementUI from 'element-ui'
// 加载 element 组件库的样式

// 加载mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { ElementTiptapPlugin } from 'element-tiptap'

// import ElementUI's styles
import 'element-ui/lib/theme-chalk/index.css'

// import this package's styles
import 'element-tiptap/lib/index.css'

import './styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(ElementTiptapPlugin, {
  /* plugin options */
  lang: 'zh',
  spellcheck: true // 可被 editor 同名 prop 重写
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
