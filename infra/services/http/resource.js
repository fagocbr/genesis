import HTTP from 'genesis/infra/services/http/index'
import { Http } from 'genesis'

/**
 * @param {object} object
 * @param {string} prefix
 * @returns {string}
 */
export const serialize = (object, prefix = '') => {
  const string = []
  for (let property in object) {
    if (!object.hasOwnProperty(property)) {
      continue
    }
    let key = prefix ? prefix + '[' + property + ']' : property
    let value = object[property]
    let serialized = ''
    if (value && typeof value === 'object') {
      serialized = serialize(value, key)
    }
    else {
      serialized = encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
    string.push(serialized)
  }
  return string.join('&')
}

/**
 * @param {string} base
 * @param {string} uri
 * @param {object} parameters
 * @returns {string}
 */
export const url = (base, uri, parameters) => {
  return base + (uri ? '/' + uri : '') + (parameters ? '?' + serialize(parameters) : '')
}

/**
 * @param {string} path
 * @param {Object} fixed
 * @param {Object} http
 * @returns {Function}
 */
export const create = (path, fixed = {}, http = null) => {
  if (typeof fixed !== 'object') {
    fixed = {}
  }
  if (!http) {
    http = HTTP
  }
  /**
   * @param {object} data
   * @param {string} uri
   * @param {object} parameters
   * @param {object} config
   */
  return (data, uri, parameters, config) => {
    return http.post(url(path, uri, Object.assign({}, parameters, fixed)), data, config)
  }
}

/**
 * @param {string} path
 * @param {Object} fixed
 * @param {Object} http
 * @returns {Function}
 */
export const read = (path, fixed = {}, http = null) => {
  if (typeof fixed !== 'object') {
    fixed = {}
  }
  if (!http) {
    http = HTTP
  }
  /**
   * @param {string} uri
   * @param {object} parameters
   * @param {object} config
   */
  return (uri, parameters, config) => {
    return http.get(url(path, uri, Object.assign({}, parameters, fixed)), config)
  }
}

/**
 * @param {string} path
 * @param {Object} fixed
 * @param {Object} http
 * @returns {Function}
 */
export const update = (path, fixed = {}, http = null) => {
  if (typeof fixed !== 'object') {
    fixed = {}
  }
  if (!http) {
    http = HTTP
  }
  /**
   * @param {string} id
   * @param {object} data
   * @param {object} parameters
   * @param {object} config
   */
  return (id, data, parameters, config) => {
    return http.put(url(path, id, Object.assign({}, parameters, fixed)), data, config)
  }
}

/**
 * @param {string} path
 * @param {Object} fixed
 * @param {Object} http
 * @returns {Function}
 */
export const destroy = (path, fixed = {}, http = null) => {
  if (typeof fixed !== 'object') {
    fixed = {}
  }
  if (!http) {
    http = HTTP
  }
  /**
   * @param {object} path
   * @param {string} id
   * @param {object} parameters
   */
  return (id, parameters, config) => {
    return http.delete(url(path, id, Object.assign({}, parameters, fixed)), config)
  }
}

/**
 * @param {string} value
 * @param {string} label
 * @param {Object} more
 * @return {function(*)}
 */
const map = (value, label, more = {}) => {
  return (item) => {
    const reduce = (accumulate, key) => {
      if (typeof item[more[key]] !== 'undefined') {
        accumulate[key] = item[more[key]]
      }
      return accumulate
    }
    const others = Object.keys(more).reduce(reduce, {})
    const base = {
      value: item[value],
      label: item[label]
    }
    return Object.assign({}, base, others)
  }
}

/**
 * @param response
 * @param value
 * @param label
 * @param more
 * @param callback
 */
export const success = (response, value, label, more, callback) => {
  const $body = Http.get('$body')

  const data = $body(response)
  let source = []
  if (Array.isArray(data)) {
    source = data.map(item => map(value, label, more)(item))
  }
  callback(source)
}

/**
 * @param {string} api - endpoint of api
 * @param {string} value - property what is the value in options
 * @param {string} label - property what is the label in options
 * @param {Object} more - properties do be mapped
 * @return {Function}
 */
export const source = (api, value, label, more = {}) => {
  /**
   * @param {Function} callback
   */
  return (callback) => read(api)('').then(response => success(response, value, label, more, callback))
}

/**
 * @param {string} path
 * @param {Object} fixed
 * @returns {Resource}
 */
export const resource = (path, fixed = {}) => {
  return new Resource(path, fixed)
}

/**
 * @type {Resource}
 */
class Resource {
  /**
   * @param {string} path
   * @param {Object} fixed
   */
  constructor (path, fixed) {
    this.post = create(path, fixed)
    this.get = read(path, fixed)
    this.put = update(path, fixed)
    this.patch = update(path, fixed)
    this.delete = destroy(path, fixed)
  }
}
