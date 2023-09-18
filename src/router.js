import * as VueRouter from 'vue-router'

const modules = import.meta.glob('./views/*.vue')

const routes = Object.entries(modules).map(([key, value]) => {
  // console.log(key, value)

  const path = key.replace(/^.\/views/, '').replace(/\.vue$/, '')

  return {
    path,
    name: path.replace(/\//g, '.').slice(1),
    component: value,
  }
})

// console.log(routes)

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
