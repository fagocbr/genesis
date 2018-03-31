import { Http } from 'genesis'
import { loading } from 'genesis/support/message/index'
import { default as http, install } from 'genesis/infra/services/http'
import Cache from 'js-cache'

/**
 * @param http
 * @param store
 * @param router
 * @param cache
 */
export const interceptors = (http, store, router, cache) => {
  const httpRequest = Http.get('httpRequest')
  const httpResponse = Http.get('httpResponse')
  const httpError = Http.get('httpError')
  /**
   * @param request
   * @returns {*}
   */
  const request = (request) => {
    // noinspection JSUnresolvedVariable
    if (!request.noLoading) {
      // open loading
      loading(true, 100)
    }
    return httpRequest(request, cache)
  }
  http.interceptors.request.use(request)

  /**
   * @param response
   * @returns {*}
   */
  const response = (response) => {
    // close loading
    loading(false)
    // noinspection JSUnresolvedVariable
    if (response.headers && response.headers.authorization) {
      // noinspection JSUnresolvedVariable
      store.dispatch('setAuthToken', response.headers.authorization)
    }
    return httpResponse(response, cache)
  }

  /**
   * @param error
   * @returns {Promise<any> | Promise.<*>}
   */
  const error = (error) => {
    // close loading
    loading(false)

    /**
     * Parse status of response on error
     * @param {*} response
     * @return {int}
     */
    const status = response =>  {
      // The route where request was started was leaved, all requests was canceled
      if (!response && !error.config) {
        return 0
      }
      // Handle with full error in request
      if ([401, 403].indexOf(response.status) > -1) {
        return response.status
      }
      return 0
    }

    const {response} = error

    return Promise.reject(httpError(error, router, store, status(response)))
  }

  http.interceptors.response.use(response, error)
}

/**
 * @param Vue
 * @param store
 * @param router
 * @returns {AxiosInstance}
 */
export default (Vue, {store, router}) => {
  install()
  interceptors(http, store, router, new Cache)
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return http
    }
  })
}
