import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/basic.less'
import './element_ui' // element
import './components/register'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
}).$mount('#app')
