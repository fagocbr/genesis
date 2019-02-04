import * as Validators from 'vuelidate/lib/validators'
import { fireEvent } from 'genesis/support/model/events'
import { reduce } from 'genesis/support/model/form'
import { clone } from 'genesis/support/utils'

export default {
  methods: {
    /**
     */
    touch () {
      this.$v.$touch()
    },
    /**
     */
    reset () {
      this.$v.$reset()
    },
    /**
     * @param fields
     * @returns {Object}
     */
    generateValidations (fields) {
      if (!Array.isArray(fields)) {
        return {}
      }
      const validations = {}
      fields
        .filter(schema => !!schema.validate)
        .forEach(schema => {
          validations[schema.field] = this.configureValidation(schema.validate)
        })
      return validations
    },
    /**
     * @param {Object} validate
     * @return {Object}
     */
    configureValidation (validate) {
      const configure = {}
      Object.keys(validate).forEach(property => {
        let action = Validators[property]
        if (!action.length) {
          configure[property] = action
          return true
        }

        /** In case if validate[property] is a function, insert in scope of function the values of models (record, schemas and itself) */
        if (typeof validate[property] === 'function') {
          validate[property] = validate[property](this.record, this.schemas, this)
        }

        const parameters = Array.isArray(validate[property]) ? validate[property] : [validate[property]]
        configure[property] = action(...parameters)
      })
      return configure
    },
    /**
     */
    updateComponents () {
      const components = {}
      if (this.tabs.length) {
        const reduces = (tab) => {
          return (accumulate, key) => {
            if (this.schemas[key].tab === tab.name) {
              accumulate.push(clone(this.schemas[key]))
            }
            return accumulate
          }
        }
        this.tabs.forEach(tab => {
          components[tab.name] = Object.keys(this.schemas).reduce(reduces(tab), [])
        })
      }
      this.components = components
    },
    /**
     */
    updateSchemas () {
      if (!Object.keys(this.schemas).length) {
        this.schemas = this.fields.reduce(reduce, {})
        return
      }
      const map = item => {
        if (typeof this.schemas[item.field] !== 'undefined') {
          return Object.assign({}, item, this.schemas[item.field])
        }
        return item
      }
      this.schemas = this.fields.map(map).reduce(reduce, {})
    },
    /**
     */
    updateRecord () {
      const reduces = (accumulate, field) => {
        accumulate[field] = this.data[field] || this.schemas[field].default
        if (this.$route.query[field] && this.useQueryData) {
          accumulate[field] = this.$route.query[field]
        }
        return accumulate
      }
      const record = Object.keys(this.schemas).reduce(reduces, {})
      this.setRecord(record)
    },
    /**
     */
    synchronizeRecord () {
      Object.keys(this.schemas).forEach(key => {
        if (typeof this.data[key] !== 'undefined') {
          return
        }
        this.$set(this.data, key, this.schemas[key].default)
      })
    },
    /**
     * @param {Object} record
     * @returns this
     */
    setRecord (record) {
      this.record = record
      this.executeChange()
      return this
    },
    /**
     * @param {string} field
     * @param {Object} parameters
     */
    isProgrammatically (parameters) {
      if (typeof parameters !== 'object') {
        return false
      }
      const args = [...parameters]
      if (args.length <= 1) {
        return false
      }
      return parameters[1] === true
    },
    /**
     * @param {string} field
     * @param {Object} parameters
     */
    formInput (field, parameters = []) {
      const programmatically = this.isProgrammatically(parameters)
      if (programmatically) {
        return
      }
      if (this.$v.record[field]) {
        this.$v.record[field].$touch()
      }
      // pass errors to fields
      this.schemas[field].errors = this.getErrors(field)

      // emit changes to parent
      if (!this.readonly) {
        this.fireEvent(field, 'change')
        this.$emit('form~input', this.record)
      }

      // get invalid fields
      const reduce = (accumulate, key) => {
        if (this.$v.record[key].$invalid) {
          accumulate[key] = true
        }
        return accumulate
      }
      const invalids = Object.keys(this.$v.record).reduce(reduce, {})
      // emit invalids to parent
      this.$emit('form~valid', !this.$v.$invalid, invalids)
    },
    /**
     * @param {string} event
     * @param {Vue} $field
     * @param {Object} parameters
     */
    formEvent (event, $field, parameters = {}) {
      const field = $field.field
      this.fireEvent(field, event, parameters)
    },
    /**
     * @param {string} field
     * @param {string} event
     * @param {Object} parameters
     */
    fireEvent (field, event, parameters = {}) {
      try {
        fireEvent(this.schemas, this.record, this, field, event, parameters)
      }
      catch (e) {
        console.error(e)
      }
    },
    /**
     */
    executeChange () {
      if (typeof this.change === 'function') {
        this.change(this.record, this.schemas, this)
      }
      this.modified = true
    },
    /**
     * @param {String} field
     * @param {Object} messages
     * @return {Array}
     */
    getErrors (field, messages = {}) {
      const errors = []
      if (this.schemas[field].validate && this.$v.record[field] && this.$v.record[field].$error) {
        Object.keys(this.schemas[field].validate).forEach((rule) => {
          const status = this.$v.record[field][rule]
          const parameters = this.$v.record[field].$params[rule]
          errors.push({rule, status, parameters})
        })
      }
      if (messages && messages[field]) {
        const message = messages[field]

        let rule
        let parameters = []
        if (typeof message === 'string') {
          rule = message
        }
        if (typeof message === 'object') {
          rule = message.rule
          parameters = message.parameters
        }
        if (!rule) {
          return errors
        }
        errors.push({
          rule: rule,
          status: false,
          parameters: parameters
        })
      }
      return errors
    },
    /**
     * @param {string} namespace
     * @param {AxiosResponse} response
     */
    fireWatch (namespace, response = {}) {
      if (this.watches[namespace] && typeof this.watches[namespace] === 'function') {
        try {
          this.watches[namespace](this.record, this.schemas, this, response)
        }
        catch (e) {
          console.error(e)
        }
      }
    },
    button (id, options) {
      this.$emit('form~button', id, options)
    }
  }
}
