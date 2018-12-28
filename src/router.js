import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Álbuns',
      component: Home
    },
    {
      path: '/album/:albumId',
      name: 'Imagens',
      component: () => import(/* webpackChunkName: "albumviewer" */ './views/AlbumViewer.vue')
    }
  ]
})
