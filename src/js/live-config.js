import Vue from 'vue'
import LiveConfig from '../vue/LiveConfig.vue'

require('../scss/live-config.scss')

new Vue({
  el: '#app',
  render: h => h(LiveConfig)
})
