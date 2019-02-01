import { isEqual } from 'lodash'

export default {
  watch: {
    /**
     * @param {Object} record
     * @param {Object} previous
     */
    data (record, previous) {
      if (!isEqual(record, previous)) {
        this.setRecord(record)
        this.fireWatch('set/record')
      }
    },
    /**
     * @type {Observer}
     */
    fields: {
      handler () {
        this.updateSchemas()
        this.synchronizeRecord()
      },
      deep: true
    },
    /**
     * @type {Observer}
     */
    schemas: {
      handler (schemas) {
        this.updateComponents()
      },
      deep: true
    },
    /**
     * @param {string} value
     * @param {string} old
     */
    tabSelected (value, old) {
      this.fireWatch('change/tabSelected', {
        'new': {
          index: this.getIndexTab(value),
          name: value
        },
        'old' : {
          index: this.getIndexTab(old),
          name: old
        }
      })
    },
    '$store.getters.AppMessages': {
      deep: true,
      handler (messages) {
        Object.keys(this.schemas).forEach((field) => {
          this.schemas[field].errors = this.getErrors(field, messages)
        })
      }
    }
  }
}
