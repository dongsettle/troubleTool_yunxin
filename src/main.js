import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VCharts from 'v-charts'

Vue.config.productionTip = false

Vue.use(VCharts)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
