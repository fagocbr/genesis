import moment from 'moment'
import { get } from 'lodash'
import { mask, money } from 'genesis/support/utils'

export const standardJSDATE = 'YYYY-MM-DDTHH:mm:ss.SSSZ'

/**
 * @param {string} value
 * @param {null|string} format
 * @returns {boolean}
 */
const haveMinimumDateSize = (value, format = null) => {
  return String(value).length >= 10
  // return String(value).substring(0, 10).match(/^\d{4}-\d{2}-\d{2}$/)
}

/**
 * @param value
 * @param format
 * @returns {boolean}
 */
const haveMinimumTimeSize = (value, format = null) => {
  return String(value).length >= 5
}

/**
 * @param value
 * @param format
 * @param origin
 * @returns {string}
 */
export const formatTime = (value, format = 'HH:mm', origin = null) => {
  if (!haveMinimumTimeSize(value)) {
    return ''
  }
  const time = origin ? moment(value, origin) : moment(value)
  if (!time.isValid()) {
    return ''
  }
  return format ? time.format(format) : time.format(standardJSDATE)
}

/**
 * @param {string} value
 * @param {string} format
 * @param {null|string} origin
 * @return {string}
 */
const parseDate = (value, format = 'DD/MM/YYYY', origin = null) => {
  if (!haveMinimumDateSize(value)) {
    return ''
  }
  const date = origin ? moment(value, origin) : moment(value)
  if (!date.isValid()) {
    return ''
  }
  return format ? date.format(format) : date.format(standardJSDATE)
}

/**
 * @param {string} value
 * @param {string} format
 * @param {null|string} origin
 * @return {string}
 */
export const formatDate = (value, format = 'DD/MM/YYYY', origin = null) => {
  if (typeof format === 'object') {
    return parseDate(value)
  }
  return parseDate(value, format, origin)
}

/**
 * @param value
 * @return {string}
 */
export const formatDateTime = (value) => {
  return parseDate(value, 'DD/MM/YYYY HH:mm')
}

/**
 * @param value
 * @return {string}
 */
export const formatBoolean = (value) => {
  let icon = 'check_box_outline_blank'
  if (value) {
    icon = 'check_box'
  }
  return '<i class="material-icons" style="margin: 0 0 0 10px; font-size: 20px; line-height: 0;">' + icon + '</i>'
}

/**
 * @param value
 * @return {string}
 */
export const formatMoney = (value) => {
  return '<div style="text-align: right;">' + money(value) + '</div>'
}

/**
 * @param value
 * @return {string}
 */
export const formatPhone = (value) => {
  let pattern = '(##) ####-####'
  if (length > 13) {
    pattern = '(##) #-####-####'
  }
  return mask(pattern, value)
}

/**
 * @param options
 * @returns {Function}
 */
export const formatOptions = (options) => {
  return (value) => {
    if (Array.isArray(options)) {
      const option = options.find(option => String(option.value) === String(value))
      return get(option, 'label', '')
    }
    return value
  }
}

/**
 * @param {string} query
 * @param {int} split
 * @returns {Function}
 */
export const formatHighLight = (query, split = 0) => {
  return (value) => {
    if (query) {
      let string = String(value)
      if (split && string.length > split) {
        string = generateEllipsis(string, string.toLowerCase().indexOf(query.toLowerCase()))
      }
      return stripAccent(string).replace(new RegExp(query, 'ig'), function (match) {
        return `<mark>${match}</mark>`
      })
    }
    return value
  }
}

/**
 * Format a caracter of order list base on type definition of ol tag
 *
 * @link https://www.w3schools.com/tags/tag_ol.asp
 *
 * @param {*} index
 * @param {boolean|string} type
 * @returns {*}
 */
export const formatEnumType = (index, type) => {
  if (!type) {
    type = '1'
  }

  type = String(type)

  switch (type) {
    case '1':
      return parseNumber(index)
    case 'A':
      return parseAlphanumericUpper(index)
    case 'a':
      return parseAlphanumericLower(index)
    case 'I':
      return parseRomanUpper(index)
    case 'i':
      return parseRomanLower(index)
    default:
      return NaN
  }
}

/**
 * Format a index to lower alphanumeric caracter EX.:(0 => a, 1 => b, 2 => c)
 */
const parseAlphanumericLower = (index) => {
  return String.fromCharCode(97 + index)
}

/**
 * Format a index to upper alphanumeric caracter EX.:(0 => A, 1 => B, 2 => C)
 *
 * @param index
 * @returns {string}
 */
const parseAlphanumericUpper = (index) => {
  return String.fromCharCode(65 + index)
}

/**
 * Format a index to a number caracter EX.:(0 => 1, 1 => 2, 2 => 3)
 * @param index
 * @returns {string}
 */
const parseNumber = (index) => {
  return String(++index)
}

/**
 *Format a index to upper case of roman number Ex.: (0 => I, 1 => II, 2 => III ...)
 * @param index
 * @returns {string}
 */
const parseRomanUpper = (index) => {
  index = parseNumber(index)

  const lookup = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}
  let roman = ''
  for (let i in lookup) {
    while (index >= lookup[i]) {
      roman += i
      index -= lookup[i]
    }
  }
  return roman
}

/**
 * Format a index to lower case of roman number Ex.: (0 => i, 1 => ii, 2 => iii ...)
 * @param index
 * @returns {*}
 */
const parseRomanLower = (index) => {
  return String(parseRomanUpper(index)).toLowerCase()
}

/**
 * @param {string} string
 * @param {int} start
 * @returns {string}
 */
const generateEllipsis = (string, start) => {
  if (start > 5) {
    start = start - 5
  }
  string = string.substring(start)
  if (start > 5) {
    string = '... ' + string
  }
  return string
}

/**
 * @param string
 * @returns {string}
 */
const stripAccent = (string) => {
  const specials = [
    {regex: /[\xC0-\xC6]/g, char: 'A'},
    {regex: /[\xE0-\xE6]/g, char: 'a'},
    {regex: /[\xC8-\xCB]/g, char: 'E'},
    {regex: /[\xE8-\xEB]/g, char: 'e'},
    {regex: /[\xCC-\xCF]/g, char: 'I'},
    {regex: /[\xEC-\xEF]/g, char: 'i'},
    {regex: /[\xD2-\xD6]/g, char: 'O'},
    {regex: /[\xF2-\xF6]/g, char: 'o'},
    {regex: /[\xD9-\xDC]/g, char: 'U'},
    {regex: /[\xF9-\xFC]/g, char: 'u'},
    {regex: /[\xD1]/g, char: 'N'},
    {regex: /[\xF1]/g, char: 'n'}
  ]
  const reduce = (accumulate, item) => {
    return accumulate.replace(item.regex, item.char)
  }
  return specials.reduce(reduce, string)
}
