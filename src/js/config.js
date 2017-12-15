import Vue from 'vue'
import Config from '../vue/Config.vue'

require('../scss/config.scss')

new Vue({
  el: '#app',
  render: h => h(Config)
})
