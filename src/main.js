// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Lang from 'vuejs-localization'
import router from './router'
import store from './store'
import App from './App'
import oldComponents from '@/old_components'
import components from '@/components'

Lang.requireAll(require.context('./lang', true, /\.js$/))

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Lang)
Vue.use(oldComponents)
Vue.use(components)

router.beforeEach(function (to, from, next) { 
  const lang = from.params.lang || ''
  
  if (to.path.match(/^\/\w\w\//g))
    next()
  else if (to.path.match(/^\/\w\w$/g))
    next()
  else if(lang.match(/^\w\w$/g))
    next('/' + lang + to.path)
  else
    next('/en' + to.path)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
