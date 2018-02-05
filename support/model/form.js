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
  const base = {
    field: '',
    component: '',
    label: '',
    tab: '',
    width: 100,
    order: undefined,
    events: {},
    hidden: false,
    disabled: false,
  }
  accumulate[item.field] = Object.assign({}, base, item)
  return accumulate
}
