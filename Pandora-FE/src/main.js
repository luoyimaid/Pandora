// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'lib-flexible/flexible'


import axios from 'axios'
axios.defaults.withCredentials = true
import App from './App.vue'
// Mint UI
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint);
// 将全局样式文件写在 main.js
import '@/assets/scss/reset.scss'
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',

  router,
  components: { App },
  template: '<App/>'
});
