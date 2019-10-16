import Vue from 'vue'
import Router from 'vue-router'
import routerV from './components/routerV'
import VueCookies from 'vue-cookies'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // 路由跳转后页面回到顶部
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      name: 'root',
      redirect: '/web/home',
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('./views/login/signin'),
    //   meta: {
    //     title: '登录',
    //     authKey: false,
    //   },
    // },
    {
      path: '/web',
      name: 'web',
      component: routerV,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/home/home'),
          meta: {},
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('./views/product/product'),
          meta: {},
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('./views/news/news'),
          meta: {},
        },
        {
          path: 'faqs',
          name: 'faqs',
          component: () => import('./views/faqs/faqs'),
          meta: {},
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/about/about'),
          meta: {},
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('./views/contact/contact'),
          meta: {},
        },
        {
          path: '*',
          name: '404-2',
          // redirect: '/',
          component: () => import('./views/404/404.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404-1',
      // redirect: '/',
      component: () => import('./views/404/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title // 在路由里面写入的meta里面的title字段
  } else {
    document.title = 'cosplay'
  }
  if (to.meta.authKey) {
    let authKey = VueCookies.get('authKey')
    if (authKey) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          backUrl: to.fullPath,
        }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

// 路由切换时回到页面顶部, 前面已处理
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0)
// })

export default router
