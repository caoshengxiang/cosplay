import Vue from 'vue'

// meonment 作为全局方法
import moment from 'moment'
import webStorage from 'webStorage'
import VueCookies from 'vue-cookies'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { targetNewPage } from '../utils/routerUtil'

Vue.prototype.$moment = (t, format) => {
  if (!t) {
    return ''
  }
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  // console.log(moment(t).format(format))
  return moment(t).format(format)
}
Vue.prototype.$webStorage = webStorage
VueCookies.config(2 * 60 * 60) // 单位秒，配置默认有效期
Vue.prototype.$VueCookies = VueCookies
Vue.prototype.$targetNewPage = targetNewPage
