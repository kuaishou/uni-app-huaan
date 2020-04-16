import Vue from 'vue'
import App from './App'
/* 挂载vuex全局变量 */
import store from './store'  
Vue.prototype.$store = store 

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
