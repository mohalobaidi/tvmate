import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'
import showDetails from '@/views/showDetails'
import SeasonDetails from '@/views/SeasonDetails'
import Episode from '@/views/Episode'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:lang',
      name: 'Home',
      component: {render (c) { return c('router-view') }},
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        }, {
          path: 'search/:search',
          name: 'Search',
          component: Search
        }, {
          path: '/:lang/show/:id',
          name: 'showDetails',
          component: showDetails
        }, {
          path: 'show/:id/season/:season',
          name: 'SeasonDetails',
          component: SeasonDetails
        }, {
          path: 'show/:id/season/:season/episode/:episode',
          name: 'Episode',
          component: Episode
        }
      ]
    }
  ]
})

/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/search/:search',
      name: 'Search',
      component: Search
    }, {
      path: '/show/:id',
      name: 'showDetails',
      component: showDetails
    }, {
      path: '/show/:id/season/:season',
      name: 'SeasonDetails',
      component: SeasonDetails
    }, {
      path: '/show/:id/season/:season/episode/:episode',
      name: 'Episode',
      component: Episode
    }
  ]
})
*/
