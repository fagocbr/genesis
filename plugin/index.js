import { Events } from 'quasar-framework'
import { get, set } from 'lodash'
import { Events } from 'quasar-framework'
import { uniqid } from 'genesis/support/utils'
import router from 'genesis/infra/router'

/**
 * @param {string} path
 * @param {Object} query
 * @param {string} changer
 */
export const browse = (path, query = {}, changer = '~') => {
  let remove = false
  if (query === false) {
    query = {}
  }
  const route = router.currentRoute

  if (query !== undefined) {
    query = Object.assign({}, route.query, query)
  }
  if (query === undefined) {
    query = {}
  }
  if (typeof path !== 'string') {
    push(Object.assign({}, path, {query}))
  }

  path = params(path, route.params)
  if (route.path.indexOf(path) !== -1) {
    query[changer] = uniqid()
  }
  if (remove) {
    delete query[changer]
  }

  push({path, query})
}

/**
 * @param {Object} to
 */
const push = (to) => {
  window.setTimeout(() => router.push(to), 100)
}

/**
 * @param {string} path
 * @param {Object} params
 * @return {string}
 */
const params = (path, params) => {
  if (typeof params !== 'object') {
    return path
  }
  return Object.keys(params).reduce((accumulate, key) => {
    return accumulate.replace(`:${key}`, params[key])
  }, path)
}

/**
 * @param {string} name
 * @param {Function} callback
 */
const on = (name, callback) => Events.$on(name, callback)

/**
 * @param {string} name
 */
const off = (name) => Events.$on(name)

/**
 * @param {string} name
 * @param {*} payload
 */
const emit = (name, payload) => Events.$emit(name, payload)

/**
 * @type {Object}
 */
const genesis = {
  get, set, browse, on, off, emit
}

/**
 * @param Vue
 * @returns {*}
 */
export default Vue => {
  Object.defineProperty(Vue.prototype, '$g', {
    get () {
      return genesis
    }
  })
}
