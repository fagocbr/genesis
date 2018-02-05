/**
 * @type {Object}
 */
export const props = {
  value: {
    default: undefined
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  field: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  small: {
    type: String,
    default: ''
  },
  width: {
    default: '100'
  },
  validate: {
    default: undefined
  },
  tooltip: {
    default: ''
  },
  title: {
    type: String,
    default: 'Este campo possui critérios de validação'
  },
  mask: {
    type: String,
    default: ''
  },
  className: {
    type: Array,
    default: () => ([])
  },
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: true
  },
  errors: {
    type: Array,
    default: () => ([])
  },
  visible: {
    type: Boolean,
    default: true
  },
  events: {
    type: Object,
    default: () => ({})
  },
  max: {
    default: () => undefined
  },
  cleanable: {
    type: Boolean,
    default: () => true
  },
  cleaning: {
    default: () => undefined
  }
}
