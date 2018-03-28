import axios from 'axios'
import canceler from 'axios-cancel'
import { Auth } from 'genesis'
import { URL_API, URL_HOME } from 'genesis/support'
import { loading } from 'genesis/support/message'

import configure from './configure'

/**
 * @type {Object}
 */
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

/**
 * @param {string} baseURL
 * @param {Object} headers
 * @return {AxiosInstance}
 */
export const create = (baseURL = '', headers = {}) => {
  return axios.create({
    baseURL: baseURL || URL_API,
    headers: Object.assign({}, HEADERS, headers)
  })
}

/**
 * @type {AxiosInstance}
 */
export const http = create()

http.HOME = URL_HOME

/**
 * @param http
 * @return {Promise<AxiosResponse<any>>}
 */
async function env(http) {
  return await axios
    .create()
    .get('statics/env.json')
    .then(response => {
      const env = response.data
      if (typeof env !== 'object') {
        return
      }
      http.defaults.baseURL = env.PROTOCOL + '://' + env.DOMAIN + (env.PORT ? ':' + env.PORT : '') + env.API
      http.HOME = env.PROTOCOL + '://' + env.DOMAIN + (env.PORT ? ':' + env.PORT : '') + env.HOME
    })
}

if (process.env.STAGING) {
  // noinspection JSIgnoredPromiseFromCall
  env(http)
}

/**
 * @returns {AxiosInstance}
 */
export const install = () => {
  configure(http)

  canceler(http, {
    debug: false // process.env.DEV
  })
  return http
}

/**
 * @param {string} token
 */
export const setToken = token => {
  const configureToken = Auth.get('token')
  configureToken(http, token)
}

/**
 * @param {string} reason
 */
export const abort = reason => {
  http.cancelAll(reason)
  loading(false)
}

/**
 * @param {string} requestId
 */
export const cancel = (requestId) => {
  http.cancel(requestId)
  loading(false)
}

/**
 * @type {Axios}
 */
export default http
