import moment from 'moment'

/**
 * @param {string} format
 * @returns {string}
 */
export const today = (format = 'YYYY-MM-DD') => {
  return moment(new Date()).startOf('day').format(format)
}

/**
 * @param {string} value
 * @param {string} comparator
 * @param {boolean} equal
 * @returns {null|boolean}
 */
export const isDateGreaterThan = (value, comparator, equal = false) => {
  let date1 = moment(value)
  if (!date1.isValid()) {
    return null
  }

  let date2 = moment(comparator)
  if (!date2.isValid()) {
    return null
  }

  return equal ? date1 >= date2 : date1 > date2
}

/**
 * @param {string} value
 * @param {string} comparator
 * @param {boolean} equal
 * @returns {null|boolean}
 */
export const isDateLessThan = (value, comparator, equal = false) => {
  return isDateGreaterThan(comparator, value, equal)
}
