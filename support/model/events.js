/**
 * Dispara o callback do schema
 * @param {object} schemas
 * @param {array} record
 * @param {object} $component
 * @param {string} field
 * @param {string} event
 * @param {*} parameters
 */
export const fireEvent = (schemas, record, $component, field, event, parameters = {}) => {
  if (schemas[field] && schemas[field].events && typeof schemas[field].events[event] === 'function') {
    schemas[field].events[event](record, schemas, $component, parameters)
  }
}
