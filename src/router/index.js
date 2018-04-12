import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Home from '@/components/home/home'

// 用户管理组件
import UserList from '@/components/user-list/user-list'

// 角色管理组件
import RoleList from '@/components/role-list/role-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    // 检查登陆状态令牌
    const token = window.localStorage.getItem('admin-token')
    if (!token) { // 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 有令牌就允许通过
      next()
    }
  }
})

export default router
