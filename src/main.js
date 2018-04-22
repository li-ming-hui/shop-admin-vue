// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'
import ElTreeGrid from 'element-tree-grid'

// 引入我们的公共样式
import './assets/css/style.css'

Vue.use(ElementUI)

// 将 ElTreeGrid 注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.use(httpPlugin)

Vue.config.productionTip = false

Vue.prototype.foo = 'bar'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
