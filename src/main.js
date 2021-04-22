import Vue from 'vue'
import App from './App.vue'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(TextareaAutosize)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
