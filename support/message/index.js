import { Dialog, Loading, Toast } from 'quasar-framework'

/**
 * @param {String} title
 * @param {String} message
 * @param {Array} [actions]
 */
export const alert = (title, message, actions) => {
  const buttons = [
    'Ok'
  ]

  Dialog.create({
    title: title,
    message: message,
    buttons: actions || buttons
  })
}

/**
 * @param {String} title
 * @param {String} message
 * @param {Function} ok
 * @param {Function} cancel
 */
export const confirm = (title, message, ok, cancel = null) => {
  const buttons = [
    {
      label: 'Cancelar',
      handler () {
        if (cancel) {
          cancel()
        }
      }
    },
    {
      label: 'Ok',
      handler: ok
    }
  ]

  Dialog.create({
    title: title,
    message: message,
    buttons: buttons
  })
}

/**
 * @param {Boolean} status
 * @param {String} message
 * @param {Number} delay
 */
export const loading = (status = true, delay = 0, message = '') => {
  if (status) {
    return Loading.show({
      message,
      delay
    })
  }
  return Loading.hide()
}

/**
 * @param {String} html
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const toast = (html, icon = 'done', timeout = 6000, color = '#ffffff', bgColor = 'rgba(50, 50, 50, 0.95)') => {
  Toast.create({
    html, icon, timeout, color, bgColor
  })
}

/**
 * @param {String} type
 * @param {String} html
 * @param {int} timeout
 */
export const toastType = (type, html, timeout = 6000) => {
  return Toast.create[type]({
    html, timeout
  })
}

/**
 * @param {String} html
 * @param {int} timeout
 */
export const toastPositive = (html, timeout = 6000) => {
  return toastType('positive', html, timeout)
}

/**
 * @param {String} html
 * @param {int} timeout
 */
export const toastNegative = (html, timeout = 6000) => {
  return toastType('negative', html, timeout)
}

/**
 * @param {String} html
 * @param {int} timeout
 */
export const toastInfo = (html, timeout = 6000) => {
  return toastType('info', html, timeout)
}

/**
 * @param {String} html
 * @param {int} timeout
 */
export const toastWarning = (html, timeout = 6000) => {
  return toastType('warning', html, timeout)
}

/**
 * @param {String} html
 * @param {Object} button
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const toastWithButton = (html, button, icon = 'warning', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  Toast.create({
    html, button, icon, timeout, color, bgColor
  })
}

/**
 * @param {String} html
 * @param {Function} handler
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const undo = (html, handler, icon = 'warning', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  const button = {
    label: 'Desfazer',
    handler: handler,
    color: color
  }
  return toastWithButton(html, button, icon, timeout, color, bgColor)
}

/**
 * @param {String} html
 * @param {Function} handler
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const repeat = (html, handler, icon = 'error', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  const button = {
    label: 'Tentar Novamente',
    handler: handler,
    color: color
  }
  return toastWithButton(html, button, icon, timeout, color, bgColor)
}
