import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addTask',
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/editTask',
      name: 'EditTask',
      component: EditTask
    }
  ]
})
