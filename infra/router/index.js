import Vue from 'vue'
import Router from 'vue-router'
import { Routes } from 'genesis'

Vue.use(Router)

/**
 * @type {string}
 */
export const mode = Routes.get('mode')

/**
 * @type {string}
 */
export const base = Routes.get('base')

/**
 * @type {Function}
 */
export const load = Routes.get('load')

/**
 * @type {Array}
 */
export const routes = Routes.get('routes')

/**
 * @type {Function}
 */
export const beforeEach = Routes.get('beforeEach')

/**
 * @type {Function}
 */
export const afterEach = Routes.get('afterEach')

/**
 * @type {VueRouter}
 */
const AppRouter = new Router({
  mode: mode,
  base: base,
  routes: []
})

/**
 * @param {Array} news
 */
export const add = (news) => {
  routes.push(...news)
  AppRouter.addRoutes(configure(news))
}

/**
 * @param {Array} routes
 */
export const configure = (routes) => {
  return routes.map(route => {
    route.component = load(route.component)
    if (route.children) {
      route.children = configure(route.children)
    }
    return route
  })
}

AppRouter.addRoutes(configure(routes))
AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(afterEach)

export default AppRouter
