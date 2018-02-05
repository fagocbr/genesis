import { uid } from 'quasar-framework'
import { unMask } from 'genesis/support/utils/index'
import { props } from './features'

export default {
  props: props,
  computed: {
    /**
     */
    classNames () {
      const classNames = []
      if (this.className.length) {
        classNames.push(this.className)
      }
      if (this.inline) {
        classNames.push('field-inline')
      }
      const width = 'field has-' + String(this.inline ? '100' : this.width)
      classNames.push(width)
      classNames.push(this.$options.name)
      return classNames
    },
    /**
     * @return {Array}
     */
    problems () {
      if (!Array.isArray(this.errors)) {
        return []
      }
      return this.errors.filter(error => !error.status).map(error => ({
        path: 'validation.' + error.rule,
        parameters: error.parameters
      }))
    },
    /**
     * @returns {string}
     */
    name () {
      return this.field
    }
  },
  data: () => ({
    id: '',
    maxlength: ''
  }),
  methods: {
    /**
     * @param {*} value
     */
    updateValue (value) {
      if (this.mask) {
        value = unMask(this.mask, value)
      }
      if (this.pattern) {
        value = unMask(this.pattern, value)
      }
      this.$emit('input', value, this)
    },
    /**
     * @param {Object} $event
     */
    focus ($event) {
      if (this.events.focus && typeof this.events.focus === 'function') {
        this.$emit('event', 'focus', this)
      }
    },
    /**
     * @param {Object} $event
     */
    blur ($event) {
      if (this.events.blur && typeof this.events.blur === 'function') {
        this.$emit('event', 'blur', this)
      }
    },
    /**
     * @param {Object} $event
     */
    keypress ($event) {
      if (this.events.keypress && typeof this.events.keypress === 'function') {
        this.$emit('event', 'keypress', this)
      }
    },
    /**
     * @param {Object} $event
     */
    keyup ($event) {
      if (this.events.keyup && typeof this.events.keyup === 'function') {
        this.$emit('event', 'keyup', this)
      }
    },
    /**
     * @param {Object} $event
     */
    enter ($event) {
      if (this.events.enter && typeof this.events.enter === 'function') {
        this.$emit('event', 'enter', this)
      }
    }
  },
  created () {
    this.id = uid()
    this.maxlength = this.max
  }
}
