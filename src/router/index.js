import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  hidden: true
  },

{
  path: '/404',
    component: () => import('@/views/404'),
      hidden: true
},

{
  path: '/',
    component: Layout,
      redirect: '/mine',
        children: [{
          path: 'mine',
          name: 'mine',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '我的发布', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/order',
        children: [{
          path: 'order',
          name: 'order',
          component: () => import('@/views/order/order'),
          // meta: { title: '我的订单', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/buy',
        children: [{
          path: 'buy',
          name: 'buy',
          component: () => import('@/views/buy/buy'),
          // meta: { title: '购买页面', icon: 'dashboard' }
    }]
  },{
  path: '/',
    component: Layout,
      redirect: '/allorder',
        children: [{
          path: 'allorder',
          name: 'allorder',
          component: () => import('@/views/allorder/allorder'),
          // meta: { title: '所有订单', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/infor',
        children: [{
          path: 'infor',
          name: 'infor',
          component: () => import('@/views/information/infor'),
          // meta: { title: '我的信息', icon: 'dashboard' }
    }]
  },
   {
  path: '/',
    component: Layout,
      redirect: '/isadmin',
        children: [{
          path: 'isadmin',
          name: 'isadmin',
          component: () => import('@/views/isadmin/isadmin'),
          meta: { title: '管理员页面', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/showfind',
        children: [{
          path: 'showfind',
          name: 'showfind',
          component: () => import('@/views/find/showfind'),
          // meta: { title: '搜索商品', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/find',
        children: [{
          path: 'find',
          name: 'find',
          component: () => import('@/views/find/find'),
          meta: { title: '搜索商品', icon: 'dashboard' }
    }]
  },
  {
  path: '/',
    component: Layout,
      redirect: '/showorder',
        children: [{
          path: 'showorder',
          name: 'showorder',
          component: () => import('@/views/order/showorder'),
          // meta: { title: '展示订单列表', icon: 'dashboard' }
    }]
  },
{
  path: '/example',
    component: Layout,
      redirect: '/example/table',
        name: 'Example',
          meta: { title: '所有商品', icon: 'el-icon-s-help' }, 
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
    meta: { title: '商品列表', icon: 'table' }
      },
    ]
},

{
  path: '/form',
    component: Layout,
      children: [
        {
          path: 'index',
          name: 'Form',
          component: () => import('@/views/form/index'),
        meta: { title: '发布商品', icon: 'form' }
      }
    ]
  },

{
  path: '/showarticle',
    component: Layout,
      children: [
        {
          path: 'index',
          name: 'showarticle',
          component: () => import('@/views/showarticle/index'),
           //meta: { title: '展示文章', icon: 'form' }
      }
    ]
  },



{
  path: 'external-link',
    component: Layout,
      children: [
        {
          path: 'https://blog.csdn.net/wangzhen12138?type=blog',
          meta: { title: 'csdn链接', icon: 'link' }
        }
      ]
},
 
 
  

  //message
  


// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router