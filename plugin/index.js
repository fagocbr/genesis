// noinspection ES6CheckImport
import { get, set, isEqual } from 'lodash'
import { Events } from 'quasar-framework'
import router from 'genesis/infra/router'
import { uniqid } from 'genesis/support/utils'
import {
  formatBoolean,
  formatDate,
  formatDateTime,
  formatEnumType,
  formatHighLight,
  formatMoney,
  formatPhone,
  formatOptions,
  formatTime
} from 'genesis/support/format'

/**
 * @param {string} path
 * @param {Object} query
 * @param {string} changer
 * @returns {number}
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
    return push(Object.assign({}, path, {query}))
  }

  path = params(path, route.params)
  if (route.path.indexOf(path) !== -1) {
    query[changer] = uniqid()
  }
  if (remove) {
    delete query[changer]
  }

  return push({path, query})
}

/**
 * @param {Object} to
 * @returns {number}
 */
const push = (to) => {
  return window.setTimeout(() => router.push(to), 100)
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
  const reduce = (accumulate, key) => {
    return accumulate.replace(`:${key}`, params[key])
  }
  return Object.keys(params).reduce(reduce, path)
}

/**
 * @param name
 * @param callback
 * @return {*|void}
 */
const on = (name, callback) => Events.$on(name, callback)

/**
 * @param name
 * @return {*|void}
 */
const off = (name) => Events.$off(name)

/**
 * @param name
 * @param parameters
 * @return {*|void}
 */
const emit = (name, parameters) => Events.$emit(name, parameters)

/**
 * @param value
 * @return {boolean}
 */
const is = (value) => {
  if (Array.isArray(value)) {
    return !!value.length
  }
  if (typeof value === 'object') {
    return !!Object.keys(value).length
  }
  return !!value
}

/**
 * @param value
 * @param other
 * @return {boolean}
 */
const equal = (value, other) => isEqual(value, other)

/**
 * @param id
 * @param $this
 * @return {*|Vue|Element}
 */
const ref = (id, $this) => {
  const refs = $this.$refs[id]
  if (!Array.isArray(refs)) {
    return
  }
  if (!refs.length) {
    return
  }
  return refs[0]
}

/**
 * @type {Object}
 */
const genesis = {
  get,
  set,
  browse,
  params,
  on,
  off,
  emit,
  is,
  equal,
  ref
}

/**
 * @type {Object}
 */
const format = {
  boolean: formatBoolean,
  date: formatDate,
  dateTime: formatDateTime,
  enumType: formatEnumType,
  highLight: formatHighLight,
  money: formatMoney,
  phone: formatPhone,
  options: formatOptions,
  time: formatTime
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
  Object.defineProperty(Vue.prototype, '$f', {
    get () {
      return format
    }
  })
}
