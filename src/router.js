import Vue from 'vue'
import Router from 'vue-router'
import routerV from './components/routerV'
import routerViewAdmin from './components/routerViewAdmin'
import VueCookies from 'vue-cookies'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // 路由跳转后页面回到顶部
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/web/home',
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('./views/test/test'),
      meta: {},
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import('./admin/login/signin'),
      meta: {
        title: '登录',
        authKey: false,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: routerViewAdmin,
      children: [
        {
          path: 'product',
          name: 'productAdmin',
          component: () => import('./admin/product/product'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'product/detail',
          name: 'productDetailAdmin',
          component: () => import('./admin/product/productDetail'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'news',
          name: 'newsAdmin',
          component: () => import('./admin/news/news'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'news/detail',
          name: 'newsDetailAdmin',
          component: () => import('./admin/news/newsDetail'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'faqs',
          name: 'faqsAdmin',
          component: () => import('./admin/faqs/faqs'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'faqs/detail',
          name: 'faqsDetailAdmin',
          component: () => import('./admin/faqs/faqsDetail'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'email',
          name: 'emailAdmin',
          component: () => import('./admin/email/email'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'banner',
          name: 'bannerAdmin',
          component: () => import('./admin/banner/banner'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'banner/detail',
          name: 'bannerDetailAdmin',
          component: () => import('./admin/banner/bannerDetail'),
          meta: {
            authKey: true
          },
        },
        {
          path: 'params',
          name: 'paramsAdmin',
          component: () => import('./admin/params/params'),
          meta: {
            authKey: true
          },
        },
      ]
    },
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
          path: 'product/detail',
          name: 'productDetail',
          component: () => import('./views/product/detail'),
          meta: {},
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('./views/news/news'),
          meta: {},
        },
        {
          path: 'news/detail',
          name: 'newsDetail',
          component: () => import('./views/news/newsDetail'),
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
  if (to.meta.authKey) {
    let authKey = VueCookies.get('authKey')
    if (authKey) {
      next()
    } else {
      next({
        path: '/admin/login',
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
