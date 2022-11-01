import VueRouter from 'vue-router'

import Index from '../pages/Index'
import Dep from '../pages/Dep'
import Emp from '../pages/Emp'
import EmpAdd from '../pages/EmpAdd'
import Login from '../pages/Login'


export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/dep',
        component: Dep,
      },
      {
        path: '/emp',
        component: Emp,
      }, {
        path: '/empAdd',
        component: EmpAdd,
      }]
    },
    


  ]
})