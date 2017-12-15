import Vue from 'vue'
import Viewer from '../vue/Viewer.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

require('../scss/config.scss')

new Vue({
  el: '#app',
  render: h => h(Viewer),
})
