import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Login from '@/pages/login.vue'
import OwnList from '@/pages/OwnBookList.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/table',
    children: [
      {
        path: 'user',
        name: '用户设置',
        component: UserProfile
      },
      {
        path: 'login',
        name: '用户登录',
        component: Login
      },
      {
        path: 'table',
        name: '图书列表',
        component: TableList
      },
      {
        path: 'bookList',
        name: '图书管理列表',
        component: OwnList
      }
    ]
  }
]

export default routes
