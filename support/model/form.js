import { props } from 'genesis/components/fields/index'

/**
 * @param scope
 * @returns {function(*): (boolean|*)}
 */
export const filter = (scope) => {
  return (item) => item.scopes.includes(scope)
}

/**
 * @param readonly
 * @param component
 * @returns {function(*): ({} & any & {disabled: boolean, field, component: string})}
 */
export const map = (readonly, component) => {
  return (item) => Object.assign({}, item.form, {
    disabled: readonly ? true : item.form.disabled,
    field: item.field,
    component: item.form.component ? (component + '-' + item.form.component) : ''
  })
}

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
export const sort = (a, b) => {
  if (!a.order || !b.order) {
    return 0
  }
  if (a.order < b.order) {
    return -1
  }
  if (a.order > b.order) {
    return 1
  }
  return 0
}

/**
 * @param accumulate
 * @param item
 * @return {*}
 */
export const reduce = (accumulate, item) => {
  const excluded = ['validate', 'type']
  const base = Object.keys(props).reduce((accumulate, key) => {
    if (excluded.includes(key)) {
      return accumulate
    }
    let value = props[key].default
    if (typeof value === 'function') {
      value = value()
    }
    accumulate[key] = value
    return accumulate
  }, {})
  accumulate[item.field] = Object.assign({}, base, item)
  return accumulate
}
