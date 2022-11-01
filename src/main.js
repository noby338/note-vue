//引入的是 node_modules 中的 vue，该 vue 是不含模板解析器的精简 vue
import Vue from 'vue'

//region 引入全部element组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//endregion

import App from './App.vue' //搭建脚手架后才识别该语句
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios';

//关闭 vue 的生产提示
Vue.config.productionTip = false

//允许前端发送凭证
axios.defaults.withCredentials = true;

//自定义全局变量使用 $开头 命名，其他页面可以通过 this.$axios 使用该变量
Vue.prototype.$axios = axios

// 添加请求拦截器，可省略每次发送ajax请求都携带token
axios.interceptors.request.use(req => {
  // 获取token，并添加到请求头中
  let token = window.localStorage.getItem("token");
  if (token) {
    req.headers.token = token;
  }
  // 发送请求
  return req
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
  // 从响应头中获取token，可省略登录后向浏览器存入token
  let token = res.headers.token;
  if (token) {
    window.localStorage.setItem("token", token);
  }
  return res;
});

Vue.use(ElementUI); //使用全部element组件库
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  //将 App 组件放入容器中
  render: h => h(App),
})