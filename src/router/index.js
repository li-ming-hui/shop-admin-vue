import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '@/assets/js/auth'

import Login from '@/components/login/login'
import Home from '@/components/home/home'

// 用户管理组件
import UserList from '@/components/user-list/user-list'

// 角色管理组件
import RoleList from '@/components/role-list/role-list'

// 权限列表组件
import RightsList from '@/components/rights-list/rights-list'

// 分类列表组件
import CategoryList from '@/components/category-list/category-list'

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
        },
        {
          name: 'rights-list',
          path: '/rights',
          component: RightsList
        },
        {
          name: 'category-list',
          path: '/categories',
          component: CategoryList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    // 检查是否具有当前登陆的用户信息状态
    if (!getUserInfo()) { // 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 有令牌就允许通过
      next()
    }
  }
})

export default router
