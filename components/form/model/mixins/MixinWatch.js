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
        this.updateRecord()
      },
      deep: true
    },
    /**
     * @type {Observer}
     */
    schemas: {
      handler () {
        this.updateComponents()
      },
      deep: true
    },
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
    }
  }
}
